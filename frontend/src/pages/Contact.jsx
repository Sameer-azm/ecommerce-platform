
import React, { useState } from "react";
import { MapPin, Mail, Phone, Map } from "lucide-react";

const Contact = () => {
  const FORMSPREE_ID = "mkokzarq";

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const [Form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handlechange(e) {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();

    const name = Form.name.trim();
    const email = Form.email.trim();
    const message = Form.message.trim();
    const newErrors = {};

    if (!name) newErrors.name = "Please enter your name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email";

    if (!message) newErrors.message = "Please enter your message";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Form),
      });

      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  }

  return (
    <div className="pt-24 pb-16 bg-[#f8f5f0] min-h-screen">

      {/* Header */}
      <div className="relative bg-[url('https://plus.unsplash.com/premium_photo-1681487748082-839c7c0ee0c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center py-20">
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium mb-4 text-gray-900 tracking-tight">
            CONTACT US
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">

          <h2 className="text-3xl mb-8 text-gray-900">
            Send us a Message
          </h2>

          {status === "sent" && (
            <div className="mb-5 p-4 rounded-lg bg-green-50 text-green-700 text-sm">
              Thank you! Message sent successfully.
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
              Failed to send message. Please try again.
            </div>
          )}

          <form onSubmit={handlesubmit} className="space-y-5" noValidate>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={Form.name}
                onChange={handlechange}
                className={`w-full px-5 py-3 border rounded-lg outline-none transition-colors duration-200 ${
                  errors.name ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-amber-500"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={Form.email}
                onChange={handlechange}
                className={`w-full px-5 py-3 border rounded-lg outline-none transition-colors duration-200 ${
                  errors.email ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-amber-500"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={Form.subject}
                onChange={handlechange}
                className="w-full px-5 py-3 border border-gray-300 focus:border-amber-500 rounded-lg outline-none transition-colors duration-200"
                placeholder="Inquiry about..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                value={Form.message}
                onChange={handlechange}
                className={`w-full px-5 py-3 border rounded-lg outline-none transition-colors duration-200 resize-none ${
                  errors.message ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-amber-500"
                }`}
                placeholder="How can we help?"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 active:scale-[0.98] text-gray-900 font-medium py-4 rounded-lg transition-all duration-200"
            >
              {status === "loading" ? "Sending..." : "SEND MESSAGE"}
            </button>

          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-8">

          <div>
            <h2 className="text-3xl mb-8 text-gray-900">
              Get in Touch
            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Visit Our Store</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    123 street Lane
                    <br />
                    karachi
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-700" />
                </div>
                <a href="mailto:sameerazamned@yourbrand.com" className="text-gray-500 text-sm hover:text-amber-600 transition-colors duration-150">
                  sameerazamned@gmail.com
                </a>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-700" />
                </div>
                <a href="tel:+923002121153" className="text-gray-500 text-sm hover:text-amber-600 transition-colors duration-150">
                  (+92) 300-2121153
                </a>
              </div>

            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Business Hours</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Mon–Fri</span>
                <span className="font-medium text-gray-800">9AM–6PM</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Saturday</span>
                <span className="font-medium text-gray-800">10AM–4PM</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Sunday</span>
                <span className="font-medium text-gray-800">Closed</span>
              </div>
            </div>
          </div>

          {/* <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-8 h-8 text-gray-400 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-gray-500 text-sm">Interactive Map</p>
              <p className="text-xs text-gray-400 mt-1">Embed Google Maps here</p>
            </div>
          </div> */}
        </div>

      </div>

    </div>
  );
};

export default Contact;