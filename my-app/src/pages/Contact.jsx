import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        
        {/* Left Info Section */}
        <div className="bg-slate-900 text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="mt-3 text-slate-300">
              Have a question, project idea, or just want to say hello?
              Fill out the form and we’ll get back to you soon.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium">contact@example.com</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <p className="font-medium">+1 234 567 890</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="font-medium">Remote / Worldwide</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 Your Company. All rights reserved.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-slate-800">
            Send a Message
          </h3>

          <form className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="mt-1 w-full px-4 py-2 border rounded-lg resize-none
                           focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-lg
                         hover:bg-slate-800 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
