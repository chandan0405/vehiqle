"use client";
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Camera, Search, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useDropzone } from "react-dropzone"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const HomeSearchPage = () => {
  const [searchterms, setSearchterms] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState<File | undefined>(undefined);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const router = useRouter();


  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(
    {
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"]
      },
      maxFiles: 1

    })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchterms.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/car?search=${encodeURIComponent(searchterms)}`)
  }

  const handleOnkeySubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchterms.trim()) {
        toast.error("Please enter a search term");
        return;
      }
      router.push(`/car?search=${encodeURIComponent(searchterms)}`)
    }
  }

  const handleImageSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchImage) {
      toast.info("please upload an image first")
      return;
    }
    console.log("something")
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className='relative flex items-center'>
          <Input
            type='text'
            placeholder='Enter make, model, or use our AI Image Serach...'
            value={searchterms}
            onChange={(e) => setSearchterms(e.target.value)}
            onKeyDown={handleOnkeySubmit}
            className=' pl-5 pr-6 md:pl-10 md:pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-lg text-gray-500 md:font-bold'
          />
          <div className='absolute right-[60px] md:right-[100px]'>
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive((prev) => !prev)}
              className='cursor-pointer rounded-xl p-1.5 text-black'
              style={{
                background: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : ""
              }}
            />
          </div>
          <Button type='submit' className='absolute right-2 rounded-full'>
            <Search className='h-12 w-12 flex md:hidden' />
            <span className='hidden md:flex'> Search</span>
          </Button>
        </div>
      </form>
      {
        isImageSearchActive && (
          <div className='mt-4'>
            <form onSubmit={handleImageSearch}>
              <div className='border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center'>
                {
                  imagePreview ? (
                    <div className='flex flex-col items-center '>
                      <img
                        src={
                          imagePreview}
                        alt="Car- preview"
                        className='h-40 object-contain mb-4'
                      />
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setSearchImage(undefined);
                          setImagePreview("");
                          toast.info("Image removed");
                        }}
                        className='text-black cursor-pointer'
                      >
                        Remove image
                      </Button>
                    </div>
                  ) : (
                    <div {...getRootProps()} className='cursor-pointer'>
                      <input {...getInputProps()} />
                      <div className='flex flex-col items-center '>
                        <Upload className='h-12 w-12 text-gray-400 mb-2' />
                        <p className='text-gray-500 mb-2'>
                          {
                            isDragActive && !isDragReject ?
                              "Leave the file here to upload" :
                              "Drag n drop a car image or click to select "
                          }
                        </p>
                        {
                          isDragReject && (
                            <p className='text-red-500 mb-2'>Invalid image type</p>
                          )
                        }
                        <p className='text-gray-500 text-sm'>
                          Supports: JPG, PNG (max 5MB)
                        </p>
                      </div>
                    </div>)
                }
              </div>
              {
                imagePreview && (
                  <Button
                    type='submit'
                    disabled={isImageUploading}
                    className='mt-2 cursor-pointer w-full '
                  >
                    {
                      isImageUploading ? "Uploading..." : "Search with this image"
                    }
                  </Button>
                )
              }
            </form>
          </div>
        )
      }
    </div>
  )
}

export default HomeSearchPage