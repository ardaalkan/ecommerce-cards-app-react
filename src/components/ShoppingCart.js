import { useShoppingCart } from "../context/ShoppingCartContext";

export default function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();

  console.log(cartItems, `cart items state`);

  return (
    <main
      className={
        "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 "
          : " transition-all delay-500 opacity-0 translate-x-full")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-5 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg ml-2">Cart</header>
          {cartItems.length === 0 ? <h3 className="ml-6">Cart is empty</h3> : {cartItems.map((item) => (<CartItems/>))}}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer"
        onClick={() => {
          closeCart();
        }}
      ></section>
    </main>
  );
}
