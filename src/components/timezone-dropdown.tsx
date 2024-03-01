import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const timezones = [
  { value: '(GMT-11:00)/Midway/Island', label: '(GMT-11:00) Midway Island' },
  { value: '(GMT-10:00)/Hawaii', label: '(GMT-10:00) Hawaii' },
  { value: '(GMT-09:00)/Alaska', label: '(GMT-09:00) Alaska' },
  { value: '(GMT-08:00)/Pacific/Time/(US/&/Canada)', label: '(GMT-08:00) Pacific Time (US & Canada)' },
  { value: '(GMT-07:00)/Mountain/Time/(US/&/Canada)', label: '(GMT-07:00) Mountain Time (US & Canada)' },
  { value: '(GMT-06:00)/Central/Time/(US/&/Canada)', label: '(GMT-06:00) Central Time (US & Canada)' },
  { value: '(GMT-05:00)/Eastern/Time/(US/&/Canada)', label: '(GMT-05:00) Eastern Time (US & Canada)' },
  { value: '(GMT-04:30)/Caracas', label: '(GMT-04:30) Caracas' },
  { value: '(GMT-04:00)/Atlantic/Time/(Canada)', label: '(GMT-04:00) Atlantic Time (Canada)' },
  { value: '(GMT-03:00)/Buenos/Aires', label: '(GMT-03:00) Buenos Aires' },
  { value: '(GMT-02:00)/Mid-Atlantic/-/Fernando/de/Noronha', label: '(GMT-02:00) Mid-Atlantic - Fernando de Noronha' },
  { value: '(GMT-01:00)/Azores', label: '(GMT-01:00) Azores' },
  { value: '(GMT+00:00)/London', label: '(GMT+00:00) London' },
  { value: '(GMT+01:00)/Paris', label: '(GMT+01:00) Paris' },
  { value: '(GMT+02:00)/Istanbul', label: '(GMT+02:00) Istanbul' },
  { value: '(GMT+02:00)/Cairo', label: '(GMT+02:00) Cairo' },
  { value: '(GMT+03:00)/Nairobi', label: '(GMT+03:00) Nairobi' },
  { value: '(GMT+04:00)/Dubai', label: '(GMT+04:00) Dubai' },
  { value: '(GMT+05:30)/Mumbai', label: '(GMT+05:30) Mumbai' },
  { value: '(GMT+07:00)/Jakarta', label: '(GMT+07:00) Jakarta' },
  { value: '(GMT+09:00)/Tokyo', label: '(GMT+09:00) Tokyo' },
  { value: '(GMT+10:00)/Sydney', label: '(GMT+10:00) Sydney' },
  { value: '(GMT+12:00)/Auckland', label: '(GMT+12:00) Auckland' },
];

function Timezone() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("(GMT-05:00)/Eastern/Time/(US/&/Canada)")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? timezones.find((timezone) => timezone.value.toLowerCase() === value.toLowerCase())?.label
            : "Select your timezone..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="comboBox">
        <Command>
          <CommandInput placeholder="Search your timezone..." />
          <ScrollArea className='max-h-[50vw] h-full overflow-auto'>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone.value}
                  value={timezone.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === timezone.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timezone.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}