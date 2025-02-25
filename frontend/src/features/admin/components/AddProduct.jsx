import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'

export const AddProduct = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productAddStatus = useSelector(selectProductAddStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (productAddStatus === 'fullfilled') {
            reset()
            toast.success("New product added")
            navigate("/admin/dashboard")
        }
        else if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later")
        }
    }, [productAddStatus])

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus())
        }
    }, [])

    const handleAddProduct = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("discountPercentage", data.discountPercentage);
        formData.append("stockQuantity", data.stockQuantity);

        // Append image files
        formData.append("thumbnail", data.thumbnail[0]); 
        formData.append("images", data.image0[0]);
        formData.append("images", data.image1[0]);
        formData.append("images", data.image2[0]);
        formData.append("images", data.image3[0]);

        dispatch(addProductAsync(formData));
    }

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
            <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
                
                {/* Form Fields */}
                <Stack rowGap={3}>
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                        <TextField {...register("title", { required: 'Title is required' })} />
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-selection">Brand</InputLabel>
                            <Select {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Brand">
                                {
                                    brands.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-selection">Category</InputLabel>
                            <Select {...register("category", { required: "Category is required" })} labelId="category-selection" label="Category">
                                {
                                    categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Description</Typography>
                        <TextField multiline rows={4} {...register("description", { required: "Description is required" })} />
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400} gutterBottom>Price</Typography>
                            <TextField type='number' {...register("price", { required: "Price is required" })} />
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400} gutterBottom>Discount {is480 ? "%" : "Percentage"}</Typography>
                            <TextField type='number' {...register("discountPercentage", { required: "Discount percentage is required" })} />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Stock Quantity</Typography>
                        <TextField type='number' {...register("stockQuantity", { required: "Stock Quantity is required" })} />
                    </Stack>

                    {/* Thumbnail Image Upload */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail</Typography>
                        <input type="file" accept="image/*" {...register("thumbnail", { required: "Thumbnail is required" })} />
                    </Stack>

                    {/* Product Images Upload */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Product Images</Typography>
                        <Stack rowGap={2}>
                            <input type="file" accept="image/*" {...register("image0", { required: "Image is required" })} />
                            <input type="file" accept="image/*" {...register("image1", { required: "Image is required" })} />
                            <input type="file" accept="image/*" {...register("image2", { required: "Image is required" })} />
                            <input type="file" accept="image/*" {...register("image3", { required: "Image is required" })} />
                        </Stack>
                    </Stack>

                </Stack>

                {/* Action Buttons */}
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
                    <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Product</Button>
                    <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                </Stack>

            </Stack>
        </Stack>
    )
}
