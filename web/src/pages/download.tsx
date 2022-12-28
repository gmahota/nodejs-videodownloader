
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.png'
import usersAvatarExampleImg from '../assets/users-avatar-exemples.png'
import iconCheckImg from '../assets/icon-check.svg'
import React from "react";
//import  { ReactComponent  as iconYoutubeImg}  from '../assets/icon-youtube.svg'
import { api } from './../lib/axios';

import { FormEvent, useState } from 'react'

import { Tabs } from "flowbite-react";

import { AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";


interface DonwloadProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Donwload(props: DonwloadProps) {
  const [query, setQuery] = useState('')

  async function downloadMp3(event: FormEvent) {

    event.preventDefault()

    const serverURL = "https://king-prawn-app-ks3if.ondigitalocean.app"

    const res = await fetch(`${serverURL}/youtube/downloadmp3?url=${query}`);
    if(res.status == 200) {
      var a = document.createElement('a');
        a.href = `${serverURL}/youtube/downloadmp3?url=${query}`;
        a.setAttribute('download', '');
      a.click();
    } else if(res.status == 400) {
      alert("Invalid url");
    }
  }
  
  async function downloadMp4(event: FormEvent) {

    event.preventDefault()

    const serverURL = "https://king-prawn-app-ks3if.ondigitalocean.app"

    const res = await fetch(`${serverURL}/youtube/downloadmp4?url=${query}`);
    if(res.status == 200) {
      var a = document.createElement('a');
        a.href = `${serverURL}/youtube/downloadmp4?url=${query}`;
        a.setAttribute('download', '');
      a.click();
    } else if(res.status == 400) {
      alert('Invalid url');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto">
      <main>
        <div className="grid place-items-center">
          <Image src={logoImg} alt="NLW Copa" className="" />

        </div>

        <div>
          <Tabs.Group style='underline' >
            <Tabs.Item title="Youtube" icon={AiFillYoutube} className="bg-red-200 active text-black" >
              <div >
                <p className='mt-4 text-sm text-gray-300 leading-relaxed grid place-items-center'>
                  Download your Youtube video or audio here</p>

                <form onSubmit={downloadMp4} className='mt-10 flex gap-2'>
                  <input
                    className='flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100'
                    type="text"
                    required
                    placeholder="Search or paste link here"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                  />
                  <button
                    className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
                    type='submit'>
                    Search
                  </button>
                </form>
              </div>
            </Tabs.Item>
            <Tabs.Item title="TikTok" icon={FaTiktok} className="bg-red-200 active text-black" disabled>
              TikTok
            </Tabs.Item>
            <Tabs.Item title="vimeo" disabled>
              vimeo
            </Tabs.Item>
            <Tabs.Item title="vine" disabled>
              Youtube
            </Tabs.Item>
            <Tabs.Item title="Dailymotion" disabled>
              Youtube
            </Tabs.Item>
          </Tabs.Group>


        </div>








      </main>


    </div>
  )
}