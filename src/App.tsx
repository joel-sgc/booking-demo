import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog';
import barberLogo from '@/assets/barber-logo.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Instagram } from 'lucide-react';
import avatar from '@/assets/avatar.svg';
import { Progress } from './components/ui/progress';
import { useMemo, useRef, useState } from 'react';
import { Button } from './components/ui/button';
import { Calendar } from './components/ui/calendar';
import { ScrollArea } from './components/ui/scroll-area';

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
      open: 8,
      close: 18
    },
    {
      day: 'Tuesday',
      open: 8,
      close: 18
    },
    {
      day: 'Wednesday',
      open: 8,
      close: 18
    },
    {
      day: 'Thursday',
      open: 8,
      close: 18
    },
    {
      day: 'Friday',
      open: 8,
      close: 18
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

const sectionClasses = 'w-full min-h-full h-full flex absolute top-0 md:top-[132px] left-[100vw] z-20 bg-background shrink-0 transition-all'

type day = {
  day: string;
  open: number;
  close: number;
}

function App() {
  const datePage = useRef<HTMLElement>(null);
  const infoPage = useRef<HTMLElement>(null);
  const donePage = useRef<HTMLElement>(null);

  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState('');

  const dateInfo = useMemo(() => {
    return {
      selected: {
        dayOfWeek: date?.toLocaleDateString('en-US', { weekday: 'long' }),
        dayOfMonth: date?.toLocaleDateString('en-US', { day: 'numeric' }),
        month: date?.toLocaleDateString('en-US', { month: 'long' }),
        year: date?.toLocaleDateString('en-US', { year: 'numeric' })
      },
      hours: () => {
        let selectedDay = date?.toLocaleDateString('en-US', { weekday: 'long' });
        let hours: day | undefined = barber.schedule.find((day: any) => day.day === selectedDay) as day;

        if (!hours) return;

        let openHours = [];
        for (let i = hours.open; i < hours.close; i++) {
          let stringOne = ""
          let stringTwo = ""

          if (i < 10) {
            stringOne += `0${i}:00 AM`
            stringTwo += `0${i}:30 AM`
          } else if (i < 12) {
            stringOne += `${i}:00 AM`
            stringTwo += `${i}:30 AM`
          } else if (i === 12) {
            stringOne += `12:00 PM`
            stringTwo += `12:30 PM`
          } else {
            stringOne += `0${i - 12}:00 PM`
            stringTwo += `0${i - 12}:30 PM`
          }
          
          openHours.push(stringOne, stringTwo)
        }

        return openHours
      }
    }
  }, [date])



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
      <main className='container max-h-screen h-[calc(100vh - 66px)] md:h-screen p-b-8 flex md:flex-row relative overflow-hidden'>
        <section className='flex items-center justify-start py-8 flex-col w-full h-full relative top-0 left-0 bg-background shrink-0'>
          <div className='pb-8 px-8 mb-8 flex items-center justify-start border-b-2 gap-4 w-screen md:sticky md:top-0 md:z-[100]'>
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
        <section ref={datePage} className={`${sectionClasses}`}>
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
                  setDate(undefined);
                  setTime('');
                }}  
              >
                <ChevronLeft size={32}/>
              </Button>
              <span className='text-2xl font-semibold flex-1'>Date & Time</span>
              <BookingPolicy/>
            </div>

            <Progress value={25} className='z-100'/>

            <span className='w-full text-center py-4 my-4 bg-input/50 text-2xl font-semibold'>{selectedService}</span>
          

            <Calendar 
              mode='single'
              selected={date}
              onSelect={setDate}
              className='w-full'
            />

            {dateInfo.hours() && (
              <span className='w-full text-center'>
                Book on {dateInfo.selected.dayOfWeek}, {dateInfo.selected.month} {dateInfo.selected.dayOfMonth}, {dateInfo.selected.year}
              </span>
            )} 

            {dateInfo.hours() && (
              // Find the day in the schedule
              <div className='overflow-auto h-full flex flex-col gap-3 mb-0 mt-4'>
                {dateInfo.hours() && dateInfo.hours()?.map((hour, index) => (
                  <Button className='w-full' 
                    key={`time-${index}`}
                    onClick={() => {
                      setTime(hour);
                      let page = infoPage.current;

                      if (!page) return
                      page.classList.remove('left-[100vw]');
                      page.classList.add('left-0');

                      page.classList.remove('opacity-0');
                    }}
                  >{hour}</Button>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className={`${sectionClasses}`} ref={infoPage}>
          <div className='container px-4 flex flex-col'>
            <div className='flex items-center justify-between py-4'>
              <Button className='bg-transparent text-foreground hover:bg-transparent' 
                size='icon'
                variant='ghost'
                onClick={() => {
                  let page = infoPage.current;
                  if (!page) return
                  page.classList.add('left-[100vw]');
                  page.classList.remove('left-0');
                
                  page.classList.add('opacity-0');
                  setSelectedService('');
                }}  
              >
                <ChevronLeft size={32}/>
              </Button>
              <span className='text-2xl font-semibold flex-1'>Your information</span>
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
