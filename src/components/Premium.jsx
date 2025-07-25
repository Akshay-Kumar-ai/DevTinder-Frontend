import axios from "axios";
import { useEffect, useState } from "react";
import { Base_Url } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(Base_Url + "/payment/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    // Call the async function without making useEffect async
    verifyPremiumUser();
  }, []);
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      Base_Url + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    // Open Razorpay Checkout
    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "DevTinder",
      description: "Connect to other developers",
      order_id: orderId, // This is the order_id created in the backend
      // Your success URL
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return !isUserPremium ? (
    <div className="flex justify-between mx-40 p-10">
      <div className="card w-96 bg-base-300 shadow-sm mx-2">
        <div className="card-body">
          {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-gray-300">Silver</h2>
            <span className="text-xl">Rs.499</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Customizable style templates</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Batch processing capabilities</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">
                Real-time collaboration tools
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-primary btn-block"
            >
              Buy Silver Membership
            </button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-300 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-secondary">Most Popular</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-yellow-500">Gold</h2>
            <span className="text-xl">Rs.999</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Customizable style templates</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Batch processing capabilities</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">
                Real-time collaboration tools
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-primary btn-block"
            >
              Buy Gold Membership
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className=" items-center mx-auto p-10">You are already Premium User</h1>
  );
};

export default Premium;
