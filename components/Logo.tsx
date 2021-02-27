import Image from 'next/image';

export default function Logo(props): JSX.Element {
    return (
        <Image src="/Logo.png" {...props} />
    );
}