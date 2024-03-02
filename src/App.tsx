import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog';
import barberLogo from '@/assets/barber-logo.svg';
import { Check, ChevronLeft, ChevronRight, Info, Loader2 } from 'lucide-react';
import { Instagram } from 'lucide-react';
import avatar from '@/assets/avatar.svg';
import { Progress } from './components/ui/progress';
import { useMemo, useState } from 'react';
import { Button } from './components/ui/button';
import { Calendar } from './components/ui/calendar';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';

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

type day = {
  day: string;
  open: number;
  close: number;
}

function App() {
  const [activeScreen, setActiveScreen] = useState(0);

  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState('');

  const [loading, setLoading] = useState(false);


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

  const schedule = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setActiveScreen(3);
      document.body.style.overflow = 'hidden';
      window.scrollTo({top: 100, behavior: 'smooth'});
    }, 2000)
  }

  return (
    <>
      <header className='top-0 sticky w-full bg-background z-[100] border-b-2'>
        <div className='container py-2 flex items-center justify-between border-b-2 gap-4 md:hidden'>
          <h2 className='font-semibold text-2xl py-2'>Book Apointment</h2>

          <a href={barber.instagram} target='_blank'>
            <Instagram size={32} />
          </a>
        </div>

        <div className='container p-6 flex items-center justify-start gap-4 w-full'>
          <img src={barber.image} alt={barber.name} className='rounded-full border-2 w-1/5 md:w-16 md:h-16' />
          
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
      </header>
      <main className='container flex-1 flex flex-col py-8 px-0'>
        <div className='flex flex-1 w-full h-full overflow-hidden'>
          <section style={{transform: `translateX(calc(${activeScreen} * max(-1400px, -100vw)))`, maxHeight: activeScreen === 0 ? '100%' : '0px'}} className='transition-all w-full h-full shrink-0 px-8'>
            <div className='flex items-center justify-between w-full lg:hidden'>
              <h2>Your service</h2>
          
              <BookingPolicy/>
            </div>
            <div className='w-full pt-8'>
             {barber.services.map((service, index) => (
                <button className={`flex w-full hover:bg-secondary/25 transition-colors items-center border-b-2 py-4 gap-4 ${index === 0 && 'border-t-2'}`} 
                  key={`service-${index}`} 
                  onClick={() => {
                    setSelectedService(service.name);
                    setActiveScreen(1);
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
          <section style={{transform: `translateX(calc(${activeScreen} * max(-1400px, -100vw)))`, maxHeight: activeScreen === 1 ? '100%' : '0px'}} className='transition-all w-full shrink-0 px-8'>
            <div className='flex w-full items-center justify-between py-4 border-t-2'>
              <Button className='bg-transparent text-foreground hover:bg-transparent' 
                size='icon'
                variant='ghost'
                onClick={() => {
                  setActiveScreen(0);
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

            <Progress value={33} className='max-h-[4px] min-h-[4px]'/>

            <div className='w-full text-center py-4 my-4 bg-input/50 text-2xl font-semibold rounded-lg'>{selectedService}</div>
      

            <Calendar 
              mode='single'
              selected={date}
              onSelect={setDate}
              className='w-full lg:row-span-2'
            />

            {dateInfo.hours() && (
              <div className='w-full text-center mb-4'>
                Book on {dateInfo.selected.dayOfWeek}, {dateInfo.selected.month} {dateInfo.selected.dayOfMonth}, {dateInfo.selected.year}
              </div>
            )}

            {/* Find the day in the schedule */}
            {dateInfo.hours() && (
              <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
                {dateInfo.hours()?.map((hour, index) => (
                  <Button
                    className=''
                    variant='outline' 
                    key={`time-${index}`}
                    onClick={() => {
                      setTime(hour);

                      // Scroll to the top for smooth transition
                      // Also disable scrolling while the transition is happening
                      window.scrollTo({top: 0, behavior: 'smooth'});
                      document.body.style.overflow = 'hidden';
                      
                      const nextScreen = setInterval(() => {
                        if (window.scrollY === 0) {
                          clearInterval(nextScreen);
                          setActiveScreen(2);

                          // Enable scrolling again
                          document.body.style.overflow = 'auto';
                        }
                      }, 50)
                    }}
                  >{hour}</Button>
                ))}
              </div>
            )}
          </section>
          <section style={{transform: `translateX(calc(${activeScreen} * max(-1400px, -100vw)))`, maxHeight: activeScreen === 2 ? '100%' : '0px'}} className='transition-all w-full shrink-0 px-8'>
            <div className='flex w-full items-center justify-between py-4 border-t-2'>
              <Button className='bg-transparent text-foreground hover:bg-transparent' 
                size='icon'
                variant='ghost'
                onClick={() => setActiveScreen(1)}
              >
                <ChevronLeft size={32}/>
              </Button>
              <span className='text-2xl font-semibold flex-1'>Your Info</span>
              <BookingPolicy/>
            </div>

            <Progress value={66} className='z-50 !h-1'/>

            {/* Display selected information */}
            <div className='w-full p-4 my-4 rounded-lg bg-input/50 text-xl font-semibold flex'>
              <div className='flex flex-col justify-center flex-1'>
                <span>{selectedService}</span>
                <span className='text-lg text-foreground/50'>on {dateInfo.selected.month?.slice(0,3)} {dateInfo.selected.dayOfMonth}, {time}</span>
              </div>
            
              <img src={barberLogo} width={64} height={64}/>
            </div>

            {/* Form */}
            <form onSubmit={(e) => schedule(e)} className='flex flex-col flex-1 gap-4 justify-between h-full'>
              <div className='flex flex-col gap-2'>
                <Input placeholder='Your name *' name='name' required/>
                <Input placeholder='Phone *' name='phone'  type='tel' required/>
                <Input placeholder='Your email *' name='email' type='email' required/>
              </div>

              <div className='h-full flex-1'>
                <Card>
                  <CardContent className='py-4 flex gap-4'>
                    <Info className='shrink-0 my-auto'/>
                    <span className='text-sm'>
                      Your information is safe and will not be shared with anyone.
                    </span>
                  </CardContent>
                </Card>

                <Button disabled={loading} type='submit' className='w-full mt-4'>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>                    
                  ) : 'Schedule'}
                </Button>
              </div>
            </form>
          </section>
          <section style={{transform: `translateX(calc(${activeScreen} * max(-1400px, -100vw)))`, maxHeight: activeScreen === 3 ? '100%' : '0px'}} className='transition-all w-full shrink-0 px-8 flex flex-col items-center justify-start md:justify-center gap-4'>
            <div style={{translate: `0px ${activeScreen !== 3 ? '150vh' : '0px'}`}} className='w-full max-w-[32rem] aspect-square rounded-full p-8 md:p-12 flex items-center justify-center bg-green-600/40 transition-all duration-500 delay-100'>
              <div className='w-full max-w-[32rem] aspect-square rounded-full p-8 md:p-12 flex items-center justify-center bg-green-600/40'>
                <div className='w-full max-w-[32rem] aspect-square rounded-full p-8 md:p-12 flex items-center justify-center bg-green-600/40'>
                  <div className='w-full max-w-[32rem] aspect-square rounded-full flex items-center justify-center bg-green-600/80'>
                    <Check className='text-white w-2/3 h-2/3'/>
                  </div>
                </div>
              </div>
            </div>
            <h2 style={{translate: `0px ${activeScreen !== 3 ? '150vh' : '0px'}`}} className='text-4xl font-semibold text-center transition-all duration-500 delay-100'>Appointment Scheduled!</h2>
          </section>
        </div>
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