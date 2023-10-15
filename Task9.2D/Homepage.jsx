
import React, { YuseEffect, useState,useEffect } from 'react';
import basic from "./basic.jpg"
import pro from "./pro.jpg"
import {firebaseapp} from "./utils/firebase"
import {auth,database} from "./utils/firebase"
import { v4 as uuidv4 } from 'uuid';
const data = [
  {
    id: 1,
    src: basic,
    title: "Free",
    price: "0",
  },
  {
    id: 2,
    src: pro,
    title: "Premium",
    price: "499",
  },


]
export default function Homepage() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [planType, setPlanType] = useState("");
  

  const checkout = (plan) => {
    const customerId = uuidv4(); // Generate a UUID as the customerId
    fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: plan}),
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res);
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <>
      <div className='container text-center'>
        <h1 >
          Dev@Deakin<br></br>
          Welcome to the Homepage !!!
        </h1>
      </div>
      <div className='grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto mt-20'>

        {data.map((item, idx) => (
          <div key={idx}
            className='bg-white px-6 py-8 rounded-xl text-[#4f7cff] w-full mx-auto grid place-items-center '>
            <img src={item.src}
              alt=""
              width={200}
              height={200}
              className='h-40' />
            <div className="text-4xl text-slate-700 text-center py-4 font-bold">
              {item.title}
              <p className='lg:text-sm text-xs test-center px-6 text-slate-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, optio dolore. Cupiditate nobis dolorum recusandae libero est inventore aliquid quas, quae, provident necessitatibus eaque qui commodi impedit amet alias aut.</p>
              <div className='text-4xl text-center font-bold py-4'>
                ₹ {item.price}
              </div>
              <div className='mx-auto flex justify-center items-center my-3'>
                <button
                  onClick={() => checkout(Number(item.price))}
                  className="bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2  font-bold">
                  Subscribe

                </button>

              </div>
            </div>
          </div>

        ))}


      </div>
    </>

  )
}
