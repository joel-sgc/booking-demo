import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog';
import barberLogo from '@/assets/barber-logo.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Instagram } from 'lucide-react';
import avatar from '@/assets/avatar.svg';
import { Progress } from './components/ui/progress';
import { useRef, useState } from 'react';
import { Button } from './components/ui/button';

type barberType = {
  name: string
  image: string
  description: string
  instagram: string
  services: {
    name: string
    price: number
    duration: string
  }[]
  schedule: object[]
  location: {
    address: string
    city: string
    state: string
    zip: string
    googleMaps: string
  }
}

const barber: barberType = {
  name: 'John Doe',
  image: avatar,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  instagram: 'https://www.instagram.com',
  services: [
    {
      name: 'Haircut',
      price: 20,
      duration: '30 mins'
    },
    {
      name: 'Beard trim',
      price: 10,
      duration: '15 mins'
    },
    {
      name: 'Shave',
      price: 15,
      duration: '20 mins'
    },
    {
      name: 'Haircut & Beard trim',
      price: 25,
      duration: '45 mins'
    }
  ],
  schedule: [
    {
      day: 'Monday',
      open: '08:00',
      close: '18:00'
    },
    {
      day: 'Tuesday',
      open: '08:00',
      close: '18:00'
    },
    {
      day: 'Wednesday',
      open: '08:00',
      close: '18:00'
    },
    {
      day: 'Thursday',
      open: '08:00',
      close: '18:00'
    },
    {
      day: 'Friday',
      open: '08:00',
      close: '18:00'
    },
  ],
  location: {
    address: '123 Main St',
    city: 'Anytown',
    state: 'NY',
    zip: '12345',
    googleMaps: 'https://goo.gl/maps/12345'
  }
}

function App() {
  const datePage = useRef<HTMLElement>(null);
  const infoPage = useRef<HTMLElement>(null);
  const donePage = useRef<HTMLElement>(null);

  const [selectedService, setSelectedService] = useState('');


  return (
    <>
      <header className='top-0 sticky'>
        <div className='container py-2 flex items-center justify-between border-b-2 gap-4 md:hidden'>
          <h2 className='font-semibold text-2xl py-2'>Book Apointment</h2>

          <a href={barber.instagram} target='_blank'>
            <Instagram size={32} />
          </a>
        </div>
      </header>
      <main className='container flex md:flex-row relative overflow-hidden'>
        <section className='flex items-center justify-between py-8 flex-col w-full h-full relative top-0 left-0 bg-background shrink-0'>
          <div className='pb-8 px-8 mb-8 flex items-center justify-start border-b-2 gap-4 w-screen'>
            <img src={barber.image} alt={barber.name} className='rounded-full border-2 h-1/3 w-1/3 md:w-16 md:h-16' />
            
            <div className='flex-1'>
              <h1>{barber.name}</h1>
              <a href={barber.location.googleMaps} className='underline' target='_blank'>
                {Object.values(barber.location).splice(0,4).join(', ')}
              </a>
            </div>

            <a href={barber.instagram} target='_blank' className='hidden md:block'>
              <Instagram size={42} />
            </a>
          </div>

          <div className='flex items-center justify-between w-full'>
            <h2>Your service</h2>
            
            <BookingPolicy/>
          </div>

          <div className='w-full pt-8'>
            {barber.services.map((service, index) => (
              <button className={`flex w-full border-b-2 py-4 gap-4 ${index === 0 && 'border-t-2'}`} 
              key={`service-${index}`} 
              onClick={() => {
                setSelectedService(service.name);

                let page = datePage.current;
                if (!page) return
                page.classList.remove('left-[100vw]');
                page.classList.add('left-0');

                page.classList.remove('opacity-0');
              }}>
                <img src={barberLogo} className='w-16 h-16 rounded-full border-2'/>

                <div className='flex flex-col items-start justify-center flex-1'>
                  <div>{service.name}</div>
                  <span className='opacity-60'>{service.duration} ● ${service.price}</span>
                </div>

                <div className='h-[66] w-16 flex justify-center items-center'>
                  <ChevronRight size={32}/>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section ref={datePage} className='w-full h-full flex absolute top-0 left-[100vw] z-20 bg-background shrink-0 transition-all opacity-0'>
          <div className='container px-4 flex flex-col'>
            <div className='flex items-center justify-between py-4'>
              <Button className='bg-transparent text-foreground hover:bg-transparent' 
                size='icon'
                variant='ghost'
                onClick={() => {
                  let page = datePage.current;
                  if (!page) return
                  page.classList.add('left-[100vw]');
                  page.classList.remove('left-0');
                
                  page.classList.add('opacity-0');
                  setSelectedService('');
                }}  
              >
                <ChevronLeft size={32}/>
              </Button>
              <span className='text-2xl font-semibold flex-1'>Date & Time</span>
              <BookingPolicy/>
            </div>

            <Progress value={25} className='z-100'/>

            <span className='w-full text-center py-4 my-4 bg-input/50 text-2xl font-semibold'>{selectedService}</span>
          </div>
        </section>
      </main>
    </>
  )
}

const BookingPolicy = () => (
  <Dialog>
    <DialogTrigger className='text-blue-400 px-2'>
      Booking Policy
    </DialogTrigger>
    <DialogContent className='!max-w-[90%] rounded-md'>
      <DialogTitle>Booking Policy</DialogTitle>
      <DialogDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </DialogDescription>
    </DialogContent>
  </Dialog>
)

export default App
