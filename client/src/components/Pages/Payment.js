import PaymentForm from "../Cart/PaymentForm";
import "bootstrap/dist/css/bootstrap.css";
import classes from "./Payment.module.css";

export default function Payment() {
  return (
    <div className={`container w-50 p-0 body title ${classes.title}`}>
      <div class="card d-flex ">
        <div class=" border border-dark m-4">
          <p class="h6 py-3 fs-2 mt-3 fw-bolder text-center">Payment Details</p>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
