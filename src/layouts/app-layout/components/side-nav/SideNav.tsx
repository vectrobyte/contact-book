import { useRouter } from 'next/router';
import React, { type CSSProperties, useCallback, useEffect } from 'react';
import { MdAdd, MdDelete, MdEdit, MdLabel } from 'react-icons/md';
import { RiContactsBookFill } from 'react-icons/ri';

import IconButton, { IconButtonUnstyled } from '@/components/buttons/IconButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import NavMenu from '@/layouts/app-layout/components/side-nav/components/NavMenu';
import { ESC_KEY_CODE } from '@/lib/configs';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { ROUTE_PATHS } from '@/routes';
import { type Contact, type Group, type GroupWithCount } from '@/server/models';

type SideNavProps = {
  groups: GroupWithCount[];
  isSidenavOpen: boolean;
  className?: string;
  style?: CSSProperties;
  onOpenAddGroup(): void;
  onOpenEditGroup(group: Group): void;
  onOpenDeleteGroup(group: Group): void;
  onOpenCreateContactModal(): void;
  onCloseSidenav(): void;
};
const navbarHeight = '80px';
const SideNav: React.FC<SideNavProps> = ({
  className,
  groups,
  isSidenavOpen,
  onOpenAddGroup,
  onOpenEditGroup,
  onOpenDeleteGroup,
  onOpenCreateContactModal,
  onCloseSidenav,
}) => {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const closeNavbar = useCallback(() => {
    if (!isDesktop) {
      onCloseSidenav();
    }
  }, [isDesktop, onCloseSidenav]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (isSidenavOpen && event.keyCode === ESC_KEY_CODE) {
        closeNavbar();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [isSidenavOpen, closeNavbar]);

  return (
    <aside
      className={`fixed z-10 flex w-72 flex-none flex-col border-b bg-white shadow-[4px_0px_6px_#0000001a] transition-all lg:shadow-none ${className}`}
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <div
        role="button"
        className={`fixed inset-0 transition-all lg:hidden ${isSidenavOpen ? 'block' : 'hidden'}`}
        onClick={onCloseSidenav}
      ></div>

      <div className="relative z-20 h-full bg-white">
        <ul className="sidenav sidenav-main mb-8">
          <li>
            <div className="mx-4 my-6">
              <PrimaryButton
                icon={<MdAdd size={24} />}
                onClick={() => {
                  onOpenCreateContactModal();
                }}
              >
                <span className="hidden sm:block">Create Contact</span>
              </PrimaryButton>
            </div>
          </li>
          <li>
            <NavMenu
              icon={<RiContactsBookFill size={20} />}
              label="Contacts"
              active={router.asPath === ROUTE_PATHS.contacts}
              href={ROUTE_PATHS.contacts}
              onClick={closeNavbar}
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
            const path = `/group/${group.id}`;

            return (
              <NavMenu
                key={group.id}
                label={group.label}
                icon={<MdLabel size={20} />}
                active={router.asPath === path}
                href={path}
                after={
                  <div className="relative flex-shrink-0 pr-5 transition-opacity">
                    {Boolean(group._count.group_contacts) && (
                      <p className="leading-none opacity-100 transition-all group-hover:opacity-0">
                        {group._count.group_contacts}
                      </p>
                    )}

                    <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-4 opacity-0 transition-all group-hover:opacity-100">
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
                  </div>
                }
                onClick={closeNavbar}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
