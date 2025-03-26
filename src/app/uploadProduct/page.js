// app/uploadProduct/page.js
import UploadProductForm from '@/module/Products/uploadProduct/UploadProductForm.js';

export default function UploadProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="flex flex-1 item-center justify-center text-2xl font-bold mb-4 pt-10  ">Upload Product</h1>

      <div className='flex flex-1 items-center justify-center  '>
      <UploadProductForm />
      </div>
    </div>
  );
}