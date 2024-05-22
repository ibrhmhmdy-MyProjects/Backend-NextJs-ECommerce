'use client'
import React, { useEffect, useState } from 'react';
import ProductApis from '../../_utils/ProductApis.js';
import Breadcrumbs from '../../_components/Breadcrumbs';
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import ProductList from '../../_components/ProductList';

function ProductDetails({params}) {
    const [productDetails, setProductDetails] = useState({});
    const [productSimilars,setProductSimilars] = useState([]);

    useEffect(()=>{
        getProductsById_()
        
    },[params.productId])
    const getProductsById_ = ()=>{
        ProductApis.getProductsById(params.productId).then(res=>{
            setProductDetails(res?.data?.data);
            getProductSimilars(res?.data?.data);
        });
    }
    const getProductSimilars = (product)=>{
        ProductApis.getProductsByCategory(product?.attributes?.category).then(res=>{
            console.log(res?.data?.data);
            setProductSimilars(res?.data?.data);
        });
    }
  return (
    <div className='px-10 md:px-20 py-8'>
        <Breadcrumbs product={productDetails}/>
        <div className='grid grid-cols-1 md:grid-cols-2 my-5 gap-6'>
            <ProductBanner banner={productDetails?.attributes?.banner?.data?.attributes}/>
            <ProductInfo product={productDetails}/>
        </div>
        <div>
            <h2 className='text-2xl py-5'>Similar Products</h2>
            <div>
                <ProductList products={productSimilars} />
            </div>
        </div>
    </div>
  )
}

export default ProductDetails