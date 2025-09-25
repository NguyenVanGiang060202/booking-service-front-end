import { Input } from '@/components/ui/input';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ChevronDown, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react'
import Fuse from "fuse.js"


const ListCountryCode = [
    { nameCountry: 'Afghanistan', phoneCode: '+93' },
    { nameCountry: 'Aland Islands', phoneCode: '+358' },
    { nameCountry: 'Albania', phoneCode: '+355' },
    { nameCountry: 'Algeria', phoneCode: '+213' },
    { nameCountry: 'American Samoa', phoneCode: '+1684' },
    { nameCountry: 'Andorra', phoneCode: '+376' },
    { nameCountry: 'Angola', phoneCode: '+244' },
    { nameCountry: 'Anguilla', phoneCode: '+1264' },
    { nameCountry: 'Antarctica', phoneCode: '+672' },
    { nameCountry: 'Antigua and Barbuda', phoneCode: '+1268' },
    { nameCountry: 'Argentina', phoneCode: '+54' },
    { nameCountry: 'Armenia', phoneCode: '+374' },
    { nameCountry: 'Aruba', phoneCode: '+297' },
    { nameCountry: 'Australia', phoneCode: '+61' },
    { nameCountry: 'Austria', phoneCode: '+43' },
    { nameCountry: 'Azerbaijan', phoneCode: '+994' },
    { nameCountry: 'Bahamas', phoneCode: '+1242' },
    { nameCountry: 'Bahrain', phoneCode: '+973' },
    { nameCountry: 'Bangladesh', phoneCode: '+880' },
    { nameCountry: 'Barbados', phoneCode: '+1246' },
    { nameCountry: 'Belarus', phoneCode: '+375' },
    { nameCountry: 'Belgium', phoneCode: '+32' },
    { nameCountry: 'Belize', phoneCode: '+501' },
    { nameCountry: 'Benin', phoneCode: '+229' },
    { nameCountry: 'Bermuda', phoneCode: '+1441' },
    { nameCountry: 'Bhutan', phoneCode: '+975' },
    { nameCountry: 'Bolivia, Plurinational State of', phoneCode: '+591' },
    { nameCountry: 'Bosnia and Herzegovina', phoneCode: '+387' },
    { nameCountry: 'Botswana', phoneCode: '+267' },
    { nameCountry: 'Brazil', phoneCode: '+55' },
    { nameCountry: 'British Indian Ocean Territory', phoneCode: '+246' },
    { nameCountry: 'Brunei Darussalam', phoneCode: '+673' },
    { nameCountry: 'Bulgaria', phoneCode: '+359' },
    { nameCountry: 'Burkina Faso', phoneCode: '+226' },
    { nameCountry: 'Burundi', phoneCode: '+257' },
    { nameCountry: 'Cambodia', phoneCode: '+855' },
    { nameCountry: 'Cameroon', phoneCode: '+237' },
    { nameCountry: 'Canada', phoneCode: '+1' },
    { nameCountry: 'Cape Verde', phoneCode: '+238' },
    { nameCountry: 'Cayman Islands', phoneCode: '+1345' },
    { nameCountry: 'Central African Republic', phoneCode: '+236' },
    { nameCountry: 'Chad', phoneCode: '+235' },
    { nameCountry: 'Chile', phoneCode: '+56' },
    { nameCountry: 'China', phoneCode: '+86' },
    { nameCountry: 'Colombia', phoneCode: '+57' },
    { nameCountry: 'Comoros', phoneCode: '+269' },
    { nameCountry: 'Costa Rica', phoneCode: '+506' },
    { nameCountry: 'Croatia', phoneCode: '+385' },
    { nameCountry: 'Cuba', phoneCode: '+53' },
    { nameCountry: 'Cyprus', phoneCode: '+357' },
    { nameCountry: 'Czech Republic', phoneCode: '+420' },
    { nameCountry: 'Denmark', phoneCode: '+45' },
    { nameCountry: 'Djibouti', phoneCode: '+253' },
    { nameCountry: 'Dominica', phoneCode: '+1767' },
    { nameCountry: 'Dominican Republic', phoneCode: '+1849' },
    { nameCountry: 'Ecuador', phoneCode: '+593' },
    { nameCountry: 'Egypt', phoneCode: '+20' },
    { nameCountry: 'El Salvador', phoneCode: '+503' },
    { nameCountry: 'Equatorial Guinea', phoneCode: '+240' },
    { nameCountry: 'Eritrea', phoneCode: '+291' },
    { nameCountry: 'Estonia', phoneCode: '+372' },
    { nameCountry: 'Ethiopia', phoneCode: '+251' },
    { nameCountry: 'Faroe Islands', phoneCode: '+298' },
    { nameCountry: 'Fiji', phoneCode: '+679' },
    { nameCountry: 'Finland', phoneCode: '+358' },
    { nameCountry: 'France', phoneCode: '+33' },
    { nameCountry: 'French Guiana', phoneCode: '+594' },
    { nameCountry: 'French Polynesia', phoneCode: '+689' },
    { nameCountry: 'Gabon', phoneCode: '+241' },
    { nameCountry: 'Gambia', phoneCode: '+220' },
    { nameCountry: 'Georgia', phoneCode: '+995' },
    { nameCountry: 'Germany', phoneCode: '+49' },
    { nameCountry: 'Ghana', phoneCode: '+233' },
    { nameCountry: 'Gibraltar', phoneCode: '+350' },
    { nameCountry: 'Greece', phoneCode: '+30' },
    { nameCountry: 'Greenland', phoneCode: '+299' },
    { nameCountry: 'Grenada', phoneCode: '+1473' },
    { nameCountry: 'Guadeloupe', phoneCode: '+590' },
    { nameCountry: 'Guam', phoneCode: '+1671' },
    { nameCountry: 'Guatemala', phoneCode: '+502' },
    { nameCountry: 'Guinea', phoneCode: '+224' },
    { nameCountry: 'Guinea‑Bissau', phoneCode: '+245' },
    { nameCountry: 'Guyana', phoneCode: '+595' },
    { nameCountry: 'Haiti', phoneCode: '+509' },
    { nameCountry: 'Honduras', phoneCode: '+504' },
    { nameCountry: 'Hungary', phoneCode: '+36' },
    { nameCountry: 'Iceland', phoneCode: '+354' },
    { nameCountry: 'India', phoneCode: '+91' },
    { nameCountry: 'Indonesia', phoneCode: '+62' },
    { nameCountry: 'Iran, Islamic Republic of', phoneCode: '+98' },
    { nameCountry: 'Iraq', phoneCode: '+964' },
    { nameCountry: 'Ireland', phoneCode: '+353' },
    { nameCountry: 'Israel', phoneCode: '+972' },
    { nameCountry: 'Italy', phoneCode: '+39' },
    { nameCountry: 'Jamaica', phoneCode: '+1876' },
    { nameCountry: 'Japan', phoneCode: '+81' },
    { nameCountry: 'Jordan', phoneCode: '+962' },
    { nameCountry: 'Kazakhstan', phoneCode: '+7' },
    { nameCountry: 'Kenya', phoneCode: '+254' },
    { nameCountry: 'Kiribati', phoneCode: '+686' },
    { nameCountry: 'Kuwait', phoneCode: '+965' },
    { nameCountry: 'Kyrgyzstan', phoneCode: '+996' },
    { nameCountry: 'Laos', phoneCode: '+856' },
    { nameCountry: 'Latvia', phoneCode: '+371' },
    { nameCountry: 'Lebanon', phoneCode: '+961' },
    { nameCountry: 'Lesotho', phoneCode: '+266' },
    { nameCountry: 'Liberia', phoneCode: '+231' },
    { nameCountry: 'Libya', phoneCode: '+218' },
    { nameCountry: 'Liechtenstein', phoneCode: '+423' },
    { nameCountry: 'Lithuania', phoneCode: '+370' },
    { nameCountry: 'Luxembourg', phoneCode: '+352' },
    { nameCountry: 'Macedonia (North)', phoneCode: '+389' },
    { nameCountry: 'Madagascar', phoneCode: '+261' },
    { nameCountry: 'Malawi', phoneCode: '+265' },
    { nameCountry: 'Malaysia', phoneCode: '+60' },
    { nameCountry: 'Maldives', phoneCode: '+960' },
    { nameCountry: 'Mali', phoneCode: '+223' },
    { nameCountry: 'Malta', phoneCode: '+356' },
    { nameCountry: 'Marshall Islands', phoneCode: '+692' },
    { nameCountry: 'Mauritania', phoneCode: '+222' },
    { nameCountry: 'Mauritius', phoneCode: '+230' },
    { nameCountry: 'Mexico', phoneCode: '+52' },
    { nameCountry: 'Micronesia, Federated States of', phoneCode: '+691' },
    { nameCountry: 'Moldova, Republic of', phoneCode: '+373' },
    { nameCountry: 'Monaco', phoneCode: '+377' },
    { nameCountry: 'Mongolia', phoneCode: '+976' },
    { nameCountry: 'Montenegro', phoneCode: '+382' },
    { nameCountry: 'Morocco', phoneCode: '+212' },
    { nameCountry: 'Mozambique', phoneCode: '+258' },
    { nameCountry: 'Myanmar', phoneCode: '+95' },
    { nameCountry: 'Namibia', phoneCode: '+264' },
    { nameCountry: 'Nauru', phoneCode: '+674' },
    { nameCountry: 'Nepal', phoneCode: '+977' },
    { nameCountry: 'Netherlands', phoneCode: '+31' },
    { nameCountry: 'New Caledonia', phoneCode: '+687' },
    { nameCountry: 'New Zealand', phoneCode: '+64' },
    { nameCountry: 'Nicaragua', phoneCode: '+505' },
    { nameCountry: 'Niger', phoneCode: '+227' },
    { nameCountry: 'Nigeria', phoneCode: '+234' },
    { nameCountry: 'Niue', phoneCode: '+683' },
    { nameCountry: 'Norfolk Island', phoneCode: '+672' },
    { nameCountry: 'Northern Mariana Islands', phoneCode: '+1670' },
    { nameCountry: 'Norway', phoneCode: '+47' },
    { nameCountry: 'Oman', phoneCode: '+968' },
    { nameCountry: 'Pakistan', phoneCode: '+92' },
    { nameCountry: 'Palau', phoneCode: '+680' },
    { nameCountry: 'Panama', phoneCode: '+507' },
    { nameCountry: 'Papua New Guinea', phoneCode: '+675' },
    { nameCountry: 'Paraguay', phoneCode: '+595' },
    { nameCountry: 'Peru', phoneCode: '+51' },
    { nameCountry: 'Philippines', phoneCode: '+63' },
    { nameCountry: 'Poland', phoneCode: '+48' },
    { nameCountry: 'Portugal', phoneCode: '+351' },
    { nameCountry: 'Puerto Rico', phoneCode: '+1787' },
    { nameCountry: 'Qatar', phoneCode: '+974' },
    { nameCountry: 'Romania', phoneCode: '+40' },
    { nameCountry: 'Russia', phoneCode: '+7' },
    { nameCountry: 'Rwanda', phoneCode: '+250' },
    { nameCountry: 'Saint Kitts and Nevis', phoneCode: '+1869' },
    { nameCountry: 'Saint Lucia', phoneCode: '+1758' },
    { nameCountry: 'Saint Vincent and the Grenadines', phoneCode: '+1784' },
    { nameCountry: 'Samoa', phoneCode: '+685' },
    { nameCountry: 'San Marino', phoneCode: '+378' },
    { nameCountry: 'Saudi Arabia', phoneCode: '+966' },
    { nameCountry: 'Senegal', phoneCode: '+221' },
    { nameCountry: 'Serbia', phoneCode: '+381' },
    { nameCountry: 'Seychelles', phoneCode: '+248' },
    { nameCountry: 'Sierra Leone', phoneCode: '+232' },
    { nameCountry: 'Singapore', phoneCode: '+65' },
    { nameCountry: 'Slovakia', phoneCode: '+421' },
    { nameCountry: 'Slovenia', phoneCode: '+386' },
    { nameCountry: 'Solomon Islands', phoneCode: '+677' },
    { nameCountry: 'Somalia', phoneCode: '+252' },
    { nameCountry: 'South Africa', phoneCode: '+27' },
    { nameCountry: 'South Sudan', phoneCode: '+211' },
    { nameCountry: 'Spain', phoneCode: '+34' },
    { nameCountry: 'Sri Lanka', phoneCode: '+94' },
    { nameCountry: 'Sudan', phoneCode: '+249' },
    { nameCountry: 'Suriname', phoneCode: '+597' },
    { nameCountry: 'Sweden', phoneCode: '+46' },
    { nameCountry: 'Switzerland', phoneCode: '+41' },
    { nameCountry: 'Syrian Arab Republic', phoneCode: '+963' },
    { nameCountry: 'Taiwan, Province of China', phoneCode: '+886' },
    { nameCountry: 'Tajikistan', phoneCode: '+992' },
    { nameCountry: 'Tanzania, United Republic of', phoneCode: '+255' },
    { nameCountry: 'Thailand', phoneCode: '+66' },
    { nameCountry: 'Timor‑Leste', phoneCode: '+670' },
    { nameCountry: 'Togo', phoneCode: '+228' },
    { nameCountry: 'Tonga', phoneCode: '+676' },
    { nameCountry: 'Trinidad and Tobago', phoneCode: '+1868' },
    { nameCountry: 'Tunisia', phoneCode: '+216' },
    { nameCountry: 'Turkey', phoneCode: '+90' },
    { nameCountry: 'Turkmenistan', phoneCode: '+993' },
    { nameCountry: 'Tuvalu', phoneCode: '+688' },
    { nameCountry: 'Uganda', phoneCode: '+256' },
    { nameCountry: 'Ukraine', phoneCode: '+380' },
    { nameCountry: 'United Arab Emirates', phoneCode: '+971' },
    { nameCountry: 'United Kingdom', phoneCode: '+44' },
    { nameCountry: 'United States', phoneCode: '+1' },
    { nameCountry: 'Uruguay', phoneCode: '+598' },
    { nameCountry: 'Uzbekistan', phoneCode: '+998' },
    { nameCountry: 'Vanuatu', phoneCode: '+678' },
    { nameCountry: 'Venezuela, Bolivarian Republic of', phoneCode: '+58' },
    { nameCountry: 'Viet Nam', phoneCode: '+84' },
    { nameCountry: 'Yemen', phoneCode: '+967' },
    { nameCountry: 'Zambia', phoneCode: '+260' },
    { nameCountry: 'Zimbabwe', phoneCode: '+263' }
];

export default function InputPhonenumber() {
    const [searchResults, setSearchResults] = useState(ListCountryCode);
    const [selectCode, SetSelectCode] = useState(ListCountryCode[0].phoneCode)
    const [open, setOpen] = useState(false)


    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const options = {
        includeMatches: true,
        threshold: 0.2,
        keys: ["nameCountry"],
    }

    const fuse = new Fuse(ListCountryCode, options);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        if (value.length === 0) {
            setSearchResults(ListCountryCode);
            return;
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const results = fuse.search(value);
            const items = results.map((result) => result.item);
            setSearchResults(items);
        }, 500);
    }
    function handleOnSelect(value: string) {
        SetSelectCode(value)
        setOpen(false)
    }
    return (
        <div className='flex justify-center items-center w-fit'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className='flex gap-4 justify-between items-center p-2 h-14 text-lg border-2'>
                    <span>
                        {selectCode}
                    </span>
                    <ChevronDown />
                </PopoverTrigger>
                <Input type='tel' pattern="^[0-9-+\s()]*$"
                    className='w-full h-14 rounded-none placeholder:text-slate-500'
                    placeholder='Your Number Phone'
                    onKeyDown={(e) => {
                        if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', "Tab", "ArrowLeft", "ArrowRight",].includes(e.key)) {
                            e.preventDefault();
                        }
                    }} />
                <PopoverContent

                    align='start' className='overflow-y-scroll p-4 border-2 shadow-sm w-100 h-100 max-h-100'>
                    <div className="flex justify-between items-center w-full border-2">
                        <input type='string' placeholder='Your Country Code'
                            pattern="^[A-Za-zÀ-ỹ\s]*$"
                            className='p-2 w-full h-10 rounded-none border-none placeholver:text-slate-500 bg-inherit focus:outline-none'
                            onKeyDown={(e) => {
                                const allowedKeys = [
                                    "Backspace",
                                    "Delete",
                                    "Tab",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    " ",
                                ];
                                const isLetter = /^[a-zA-ZÀ-ỹ]$/.test(e.key);

                                if (!isLetter && !allowedKeys.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={handleOnChange} />
                        <PopoverClose className="PopoverClose" aria-label="Close">
                            <XIcon />
                        </PopoverClose>
                    </div>
                    <div
                        className='flex flex-col gap-2'>
                        {searchResults.length === 0 ? (
                            <>
                                {ListCountryCode.map((coutrycode, index) => (
                                    <div key={coutrycode.nameCountry} className="flex gap-2 justify-start items-center pl-4">
                                        <span className="">{coutrycode.nameCountry}</span>
                                        <span className=''>{`(${coutrycode.phoneCode})`}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {searchResults.map((coutrycode, index) => (
                                    <button key={coutrycode.nameCountry} onClick={() => handleOnSelect(coutrycode.phoneCode)} className="flex gap-2 justify-start items-center hover:bg-gray-300">
                                        <span className="">{coutrycode.nameCountry}</span>
                                        <span className=''>{`(${coutrycode.phoneCode})`}</span>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
