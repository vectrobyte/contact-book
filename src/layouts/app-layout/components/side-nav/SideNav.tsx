import { useRouter } from 'next/router';
import React, { type CSSProperties } from 'react';
import { MdAdd, MdDelete, MdEdit, MdLabel } from 'react-icons/md';
import { RiContactsBookFill } from 'react-icons/ri';

import IconButton, { IconButtonUnstyled } from '@/components/buttons/IconButton';
import NavMenu from '@/layouts/app-layout/components/side-nav/components/NavMenu';
import { ROUTE_PATHS } from '@/routes';
import { type Group } from '@/server/models';

type SideNavProps = {
  className?: string;
  style?: CSSProperties;
  groups: Group[];
  onOpenAddGroup: () => void;
  onOpenEditGroup: (group: Group) => void;
  onOpenDeleteGroup: (group: Group) => void;
};
const navbarHeight = '80px';
const SideNav: React.FC<SideNavProps> = ({
  className,
  groups,
  onOpenAddGroup,
  onOpenEditGroup,
  onOpenDeleteGroup,
}) => {
  const router = useRouter();

  return (
    <aside
      className={`fixed flex w-64 w-64 flex-none flex-col bg-white pt-4 ${className}`}
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <div className="mb-4 bg-white">
        <ul className="sidenav sidenav-main mb-8">
          <li>
            <NavMenu
              icon={<RiContactsBookFill size={20} />}
              label="Contacts"
              active={router.asPath === ROUTE_PATHS.contacts}
              href={ROUTE_PATHS.contacts}
            />
          </li>
        </ul>

        <ul className="sidenav sidenav-main">
          <li className="py-2 pl-5 pr-2">
            <div className="flex items-center transition-colors">
              <div className="flex flex-auto items-center justify-between">
                <span className="align-middle transition-colors">Groups</span>
              </div>

              <IconButton
                title="Edit"
                className="p-1"
                onClick={() => {
                  onOpenAddGroup();
                }}
              >
                <MdAdd size={24} />
              </IconButton>
            </div>
          </li>

          {groups.map((group) => {
            const path = `/groups/${group.id}`;

            return (
              <NavMenu
                key={group.id}
                label={group.label}
                icon={<MdLabel size={20} />}
                active={router.asPath === path}
                href={path}
                after={
                  <div className="flex flex-shrink-0 items-center justify-end gap-3 pr-5 opacity-0 transition-opacity group-hover:opacity-100">
                    <IconButtonUnstyled
                      title="Edit"
                      className="hover:brightness-75"
                      onClick={() => {
                        onOpenEditGroup(group);
                      }}
                    >
                      <MdEdit size={18} />
                    </IconButtonUnstyled>
                    <IconButtonUnstyled
                      title="Delete"
                      className="hover:brightness-75"
                      onClick={() => {
                        onOpenDeleteGroup(group);
                      }}
                    >
                      <MdDelete size={18} />
                    </IconButtonUnstyled>
                  </div>
                }
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
