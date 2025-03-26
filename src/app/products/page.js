
import React from 'react'
import ProductsCard from '@/module/Products/index'

const page = () => {
  return (
    <section>
        <div>
        <p className='text-3xl flex flex-1 font-bold mb-6 items-center justify-center pt-10'>
        Explore Products
      </p>
        </div>

        <div>
            <ProductsCard />
        </div>
    </section>
  )
}

export default page