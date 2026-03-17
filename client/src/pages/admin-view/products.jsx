import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button"
import {  Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useEffect, useState } from "react"
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/products-slice";



const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : '',
    salePrice : '',
    totalStock : '',

}



function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch()

    function onSubmit (event) {
        event.preventDefault();
    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    console.log(productList, "productList")


    return (
        <Fragment>
            <div className="flex w-full mb-5 justify-end">
                    <Button onClick={() => setOpenCreateProductsDialog(true)}>
                        Add New Product
                    </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            </div>


            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false);
                }}
            >

                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            Add New Product
                        </SheetTitle>
                    </SheetHeader>

                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />

                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText='Add'
                            formControls={addProductFormElements}
                        />
                    </div>

                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts