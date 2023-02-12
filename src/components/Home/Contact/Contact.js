import React from "react";

const Contact = () => {
  return (
    <div className="mt-28">
      <h1 className="text-center text-3xl">Let us handle your <br/> project, professionally.</h1>
      <form className="lg:w-1/2 mx-auto p-5 mt-10">
        <div className="grid lg:grid-cols-2 gap-5 mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered input-secondary w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-secondary   w-full"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered input-secondary  w-full"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered input-secondary  w-full"
          />
        </div>

        <textarea
          className="textarea textarea-bordered textarea-secondary  w-full mt-5"
          placeholder="Your Message"
        ></textarea>
       <div className="flex justify-center">
       <input type="submit" className="btn btn-secondary mt-5" value="send message"/>
       </div>
      </form>
    </div>
  );
};

export default Contact;
