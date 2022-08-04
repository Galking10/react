import { Product } from '../components/Product';
import { useProducts } from '../hooks/products';
import {Modal} from '../components/Modal';
import {ErrorMassage} from '../components/Error.Massage'
import {Loader} from '../components/Loader'
import {useContext, useState} from 'react'
import { CreateProduct } from '../components/createProduct';
import { IProduct } from '../models';
import { ModalContext } from '../components/ModalCOntext';


export function ProductsPage(){
    const {products, error, loading, addProduct}= useProducts()
    const {modal, open, close} = useContext(ModalContext)
    const createHandler = (product: IProduct)=>{
      close()
      addProduct(product)
    }
    return (
      <div className="container mx-auto max-v-2xl pt-5">
        {loading && <Loader/>}
        {error && <ErrorMassage error={error}/>}
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      {modal && <Modal title='Create new product' onClose={close}>
      <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button 
      className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
      onClick={open}
      >+</button>
        
      
      </div>
    );
}