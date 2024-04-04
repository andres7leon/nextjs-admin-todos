import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Carrito de compras",
  description: "Carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductInCarts = (cart: any) => {
  const productsInCart: ProductInCart[] = [];

  for ( const id of Object.keys(cart) ) {
    const product = products.find( product => product.id === id );
    if ( product ) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};


export default function cartPage() {

  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value || '{}')
  const productsInCart = getProductInCarts(cart);

  const totalToPay = productsInCart.reduce( (prev, current) => (current.product.price * current.quantity ) + prev, 0 )

  return (
    <div>
      <h1 className="text-xl text-purple-950 py-5">Productos en el carrito</h1>
      <div className="py-5 flex flex-col">

        <div className="flex flex-col gap-2 w-full sm:w-8/12">

          {
            productsInCart.map( ({ product, quantity }) => (
              <ItemCard key={product.id} product={product} quantity={quantity} />
            ))
          }

        </div>

        <div className="flex flex-col w-full sm:w-4/12 mt-20">
          <WidgetItem title="Total a pagar">
            <div className="flex flex-col">
              <div className="text-purple-950">
                <h3 className="text-xl text-center mt-3">$ {(totalToPay * 1.15).toFixed(2)}</h3>
              </div>
              <div className="mt-5">
                <span  className="text-purple-950"> Impuestos 15% $ {totalToPay * 0.15}</span>
              </div>
            </div>
          </WidgetItem>
        </div>
        

      </div>
    </div>
  );
}