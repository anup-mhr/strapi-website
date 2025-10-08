import React from 'react'
import Image from 'next/image';
import LinkButton from './LinkButton';

const Heading = ({ title, subtitle, CTA, href }: { title: string, subtitle: string, CTA?: string, href?: string }) => {
    return (
        <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 mb-12">
            <Image
                src={"/images/design.png"}
                alt={"design"}
                width={210}
                height={100}
                className="mb-4"
            />
            <h1 className="text-5xl heading uppercase">{title}</h1>
            <h2 className="text-2xl subheading">{subtitle}</h2>
            {
                (CTA && href) && <LinkButton href={href} className="bg-black">{CTA}</LinkButton>

            }

        </div>
    )
}

export default Heading