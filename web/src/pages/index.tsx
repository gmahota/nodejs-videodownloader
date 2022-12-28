
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.png'
import usersAvatarExampleImg from '../assets/users-avatar-exemples.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from './../lib/axios';

import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão foi criado com sucesso, o código foi copiado para a area de transferencia')

      setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolao, tente novamente')
    }


  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto gap-28 grid grid-cols-2 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Faça o download dos videos nas diversas plataformas digitais!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100'
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'>
            Criar Meu BOLÃO
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ {props.poolCount}</span>
              <span>Bolões criados</span>
            </div>

          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ {props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>

          </div>
        </div>

      </main>

      <Image src={appPreviewImg}
        alt="Dois celulas exibindo uma previa da aplicacao movel do NLW "
        quality={100}
        placeholder="blur"
      />
    </div>
  )
}