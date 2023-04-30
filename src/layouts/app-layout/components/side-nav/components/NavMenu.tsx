import Link from 'next/link';
import React from 'react';
import { type UrlObject } from 'url';

type NavMenuProps = React.HTMLAttributes<HTMLElement> & {
  label: string;
  active: boolean;
  href: string | UrlObject;
  icon?: React.ReactNode;
  after?: React.ReactNode;
  onClick();
};

const NavMenu: React.FC<NavMenuProps> = ({ label, icon, active, href, after, onClick }) => {
  return (
    <div
      className={`group flex w-full items-center gap-4 transition-colors ${
        active ? 'bg-primary-light !text-primary' : 'hover:bg-gray-100'
      }`}
    >
      <Link href={href} className="flex flex-auto items-center gap-4 px-5 py-3" onClick={onClick}>
        {icon && <div className="flex-shrink-0">{icon}</div>}

        <div className="flex flex-auto items-center justify-between truncate ">
          <span className="transition-color align-middle">{label}</span>
        </div>
      </Link>

      {after}
    </div>
  );
};

export default NavMenu;
