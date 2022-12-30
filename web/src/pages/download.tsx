
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.png'
import usersAvatarExampleImg from '../assets/users-avatar-exemples.png'
import iconCheckImg from '../assets/icon-check.svg'
import React from "react";
//import  { ReactComponent  as iconYoutubeImg}  from '../assets/icon-youtube.svg'
import { api } from './../lib/axios';

import { FormEvent, useState } from 'react'

import { Table, Tabs, Button, Modal, TextInput, Label, Checkbox } from "flowbite-react";

import { AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

import { MdDownloadForOffline } from "react-icons/md"


interface DonwloadProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Donwload(props: DonwloadProps) {
  const [query, setQuery] = useState('')
  const [modalShow, setModalShow] = useState(false)

  async function downloadYoutube(event: FormEvent){

    event.preventDefault()

    const serverURL = "http://localhost:4000"
    const res1 = await api.get(`youtube/validateURL?url=${query}`)
    console.log(res1.data)
    const res  = await fetch(`${serverURL}/youtube/validateURL?url=${query}`);
    
    console.log(res)
    setModalShow(true);


  }
  async function downloadMp3(event: FormEvent) {

    event.preventDefault()

    const serverURL = "https://king-prawn-app-ks3if.ondigitalocean.app"

    

    const res = await fetch(`${serverURL}/youtube/downloadmp3?url=${query}`);
    if (res.status == 200) {
      var a = document.createElement('a');
      a.href = `${serverURL}/youtube/downloadmp3?url=${query}`;
      a.setAttribute('download', '');
      a.click();
    } else if (res.status == 400) {
      alert("Invalid url");
    }
  }

  async function downloadMp4(event: FormEvent) {

    event.preventDefault()

    const serverURL = "https://king-prawn-app-ks3if.ondigitalocean.app"

    const res = await fetch(`${serverURL}/youtube/downloadmp4?url=${query}`);
    if (res.status == 200) {
      var a = document.createElement('a');
      a.href = `${serverURL}/youtube/downloadmp4?url=${query}`;
      a.setAttribute('download', '');
      a.click();
    } else if (res.status == 400) {
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

                <form onSubmit={downloadYoutube} className='mt-10 flex gap-2'>
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

        <React.Fragment >
          <Modal
            show={modalShow}
            size="md"
            popup={true}
            onClose={() => setModalShow(false)}
            className="dark"
          >
            <Modal.Header >
            </Modal.Header>
            <Modal.Body>
              <div className="grid place-items-center items-center">
                <Button.Group>
                  <Button pill={true}>
                    Video
                  </Button>
                  <Button color="gray">
                    Audio
                  </Button>
                </Button.Group>
              </div>
              <div className="pt-10">
                <Table>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <b>Qualidade</b>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <b>Tamanho</b>
                      </Table.Cell>
                      <Table.Cell>

                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        1080p (Full HD)
                      </Table.Cell>
                      <Table.Cell >
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>
                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        720p (m-HD)
                      </Table.Cell>
                      <Table.Cell>
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>
                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        480p
                      </Table.Cell>
                      <Table.Cell>
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>
                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell>
                        360p
                      </Table.Cell>
                      <Table.Cell>
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>
                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell>
                        240p
                      </Table.Cell>
                      <Table.Cell>
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>
                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <Table.Cell>
                        144p
                      </Table.Cell>
                      <Table.Cell>
                        10.5 MB
                      </Table.Cell>
                      <Table.Cell>

                        <MdDownloadForOffline size={35} color="#1AB7EA" />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>






      </main>


    </div>
  )
}