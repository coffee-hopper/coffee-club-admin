import { Product } from "@/types/entity-types";
import getImagePath from "@/utils/getImagePath";
import { useState } from "react";

type Props = {
  product: Product;
  quantity: number;
  size?: "small" | "medium" | "large";
};

export default function OrderProductCard({
  product,
  quantity,
  size = "medium",
}: Props) {
  const [imgSrc, setImgSrc] = useState(
    getImagePath(product.category, product.name)
  );

  const sizeStyles = {
    small: {
      container: "w-[70px] h-[70px] p-0.5 text-[10px]",
      imageWrapper: "h-[45px]",
      image: product.category === "food" ? "h-[80px]" : "h-[40px]",
      text: "h-[12px]",
    },
    medium: {
      container: "w-[100px] h-[100px] p-1 text-xs",
      imageWrapper: "h-[70px]",
      image: product.category === "food" ? "h-[120px]" : "h-[60px]",
      text: "h-[20px]",
    },
    large: {
      container: "w-[200px] h-[200px] p-2 text-base",
      imageWrapper: "h-[140px]",
      image: product.category === "food" ? "h-[240px]" : "h-[120px]",
      text: "h-[40px]",
    },
  };

  const style = sizeStyles[size];

  return (
    <div
      className={`border border-gray-300 rounded-md bg-gray-50 flex flex-col justify-between items-center ${style.container}`}
    >
      <div
        className={`${style.imageWrapper} w-full flex items-center justify-center`}
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc("/images/products/default_coffee.png")}
          className={`object-contain ${style.image}`}
        />
      </div>
      <div className={`${style.text} text-center font-medium leading-tight`}>
        {quantity} x {product.price}₺
      </div>
    </div>
  );
}
