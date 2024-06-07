import { useParams } from "react-router-dom";
// import { getProduct } from "./_utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
// import { Rating } from "primereact/rating";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { Card } from "primereact/card";
import { getCars } from "../_utils";
import { Car as CarType } from "../../../global-env";

export default function Car() {

  const { id } = useParams();
  const [quantity, setQuentity] = useState<number | null>(1);
  const { isPending, data } = useQuery({
    queryKey: ["car",id],

    queryFn: () => getCars(),
    select: (data) => data?.cars?.find((car:CarType)=>car.id==Number(id)),
  });


  if (isPending)
    return (
      <div className="p5">
        <Skeleton className="w-full p5" />
      </div>
    );

  return (
    <Card className="flex flex-col gap-4 shadow-none border ">
      <div className="grid grid-cols-2 gap-4">
        <img
          className="object-contain"
          src={data?.image}
          alt={data?.title}
        />
        <div className="flex flex-col gap-4">
          <h2 className="my-8 text-12 font-bold">{data?.title}</h2>
          <p className="text-6 font-bold">Price: ${data?.price}</p>
          <p className="text-5">{data?.description}</p>
          <p>Category: {data?.company}</p>
          {/* <Rating value={data?.rating} readOnly cancel={false} /> */}
          <div className="flex gap-4">
            <InputNumber
              value={quantity}
              onChange={(e) => setQuentity(e.value)}
              showButtons
            />
            <Button
              label="Add to cart"
              onClick={() => {
               
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
