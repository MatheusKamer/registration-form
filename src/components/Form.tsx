'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import Image from 'next/image';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório').max(50),
  email: z.string().nonempty('E-mail é obrigatório').email(),
  password: z.string().nonempty('Senha é obrigatória').min(6).max(20),
  cep: z.string().nonempty('CEP é obrigatório').length(8),
  address_number: z.string().nonempty('Número é obrigatório').min(1).max(10),
  street: z.string().nonempty('Rua é obrigatória').min(1).max(100),
  city: z.string().nonempty('Cidade é obrigatória').min(1).max(50),
  agree: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de uso',
  }),
});

type FormData = z.infer<typeof schema>;

export default function SubscriberForm() {
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cep: '',
      address_number: '',
      street: '',
      city: '',
      agree: false,
    },
  });

  return (
    <div className="max-w-lg flex flex-col gap-4 mx-auto border border-t-4 border-t-amber-400 bg-stone-50/50 p-4">
      <div className="flex items-center gap-2 w-full mb-4 relative justify-between">
        <span className="bg-amber-400 w-6 h-6 inline-block rounded-sm absolute top-1 -left-1"></span>

        <div className="text-4xl font-medium w-full z-10 text-stone-800">
          Inscreva-se
        </div>
        <Image src="/menu.svg" alt="menu" width={20} height={20} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="name" className="text-sm font-semibold">
                    Nome
                  </label>
                  <Input {...field} />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="email" className="text-sm font-semibold">
                    E-mail
                  </label>
                  <Input {...field} />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="password" className="text-sm font-semibold">
                    Senha
                  </label>
                  <Input {...field} type="password" />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
            <div className="flex gap-4">
              <Controller
                name="cep"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-[50%]">
                    <label htmlFor="cep" className="text-sm font-semibold">
                      CEP
                    </label>
                    <Input {...field} />
                    {error && <p style={{ color: 'red' }}>{error.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="street"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-[50%]">
                    <label htmlFor="street" className="text-sm font-semibold">
                      Rua
                    </label>
                    <Input {...field} />
                    {error && <p style={{ color: 'red' }}>{error.message}</p>}
                  </div>
                )}
              />
            </div>
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="city" className="text-sm font-semibold">
                    Cidade
                  </label>
                  <Input {...field} />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="Cidade" className="text-sm font-semibold">
                    Número
                  </label>
                  <Input {...field} />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
            <Controller
              name="agree"
              control={control}
              render={({ fieldState: { error } }) => (
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <label htmlFor="agree" className="text-sm font-semibold">
                    Concordo com os Termos e Condições
                  </label>
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </div>
              )}
            />
          </div>

          <Button className="bg-amber-400 text-stone-800 h-12 mt-4  hover:bg-amber-500 transition-colors duration-200">
            Cadastrar Conta
          </Button>
        </form>
      </div>
    </div>
  );
}
