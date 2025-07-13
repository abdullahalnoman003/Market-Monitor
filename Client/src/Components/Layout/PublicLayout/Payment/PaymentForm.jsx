import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../Hooks/useAxios";
import { AuthContext } from "../../../Authentication/Context/AuthContext";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { isPending, data: productInfo = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/product/${id}`);
      return res.data;
    },
  });

 if (isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold ">Please Wait... <br />Loading Information </p>
        </div>
      </div>
    );
  }

  const fullAmount = Number(productInfo.price_per_unit) || 0;
  const totalAmount = fullAmount * quantity || 0;
  const amountInCents = totalAmount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    try {
      const { error: cardError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (cardError) {
        setError(cardError.message);
        setIsProcessing(false);
        return;
      }

      const res = await axiosInstance.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res?.data?.clientSecret;
      if (!clientSecret) throw new Error("Missing client secret from server.");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        const orderData = {
          id,
          productName: productInfo.item_name,
          marketName: productInfo.market_name,
          unitPrice: productInfo.price_per_unit,
          quantity,
          totalAmount: totalAmount,
          transactionId,
          buyerEmail: user.email,
          buyerName: user.displayName,
          date: new Date(),
          status: "paid",
        };

        const saveRes = await axiosInstance.post("/orders", orderData);

        if (saveRes?.data?.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Okay!",
          });
          navigate("/all-products");
        } else {
          throw new Error("Order saving failed. Please contact support.");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-5">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">
          Complete Your Payment
        </h1>
        <p className="text-sm  mt-2">
          Securely pay for your selected product using your card. Please review
          the quantity and total before proceeding.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-primary border shadow-primary p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center ">
          Pay for:{" "}
          <span className="text-secondary">{productInfo.item_name}</span>
        </h2>

        <div className="space-y-2">
          <label className="block font-medium ">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="input shadow shadow-primary input-bordered w-full"
            required
          />
        </div>

        <div className=" p-3 rounded-lg shadow shadow-primary text-sm">
          <p>
            <strong>Unit Price:</strong> ${fullAmount.toFixed(2)}
          </p>
          <p>
            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block font-medium ">Card Info</label>
          <div className="p-3 border shadow shadow-primary rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#fa755a" },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
