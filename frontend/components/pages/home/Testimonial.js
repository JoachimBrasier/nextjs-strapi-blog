import React from "react";

export default ({ data }) =>
  data.map((testimonial) => (
    <div key={testimonial._id}>
      <h3>{testimonial.author}</h3>
    </div>
  ));
