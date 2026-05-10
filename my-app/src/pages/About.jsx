import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Organization Information
          </h1>
          <p className="mt-2 text-slate-500">
            Official contact and developer details
          </p>
        </div>

        {/* Info Grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          
          <div className="space-y-1">
            <p className="text-sm text-slate-500">Organization Name</p>
            <p className="font-semibold text-slate-800">
              NovaTech Solutions
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-slate-500">Developer</p>
            <p className="font-semibold text-slate-800">
              John Doe
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-slate-500">Email Address</p>
            <p className="font-semibold text-slate-800">
              support@novatech.com
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-slate-500">Phone Number</p>
            <p className="font-semibold text-slate-800">
              +1 987 654 3210
            </p>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <p className="text-sm text-slate-500">Office Address</p>
            <p className="font-semibold text-slate-800">
              45 Innovation Street, Tech Park,<br />
              San Francisco, CA 94105, USA
            </p>
          </div>

        </div>

      

      </div>
    </div>
  );
};

export default About;
