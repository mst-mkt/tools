import { type Icon, IconChevronDown } from '@tabler/icons-react'
import { type FC, useState } from 'react'
import { Box, Button, Drawer, Dropdown, Flex } from 'rizzui'
import { useMobile } from '../../hooks/useMobile'

type MenuItem = {
  label: string
  onClick: () => void | Promise<void>
}

type MenuProps = {
  items: MenuItem[]
  label: string
  icon?: Icon
}

const DrawerMenu: FC<MenuProps> = ({ items, label, icon: Icon }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-fit cursor-pointer items-center gap-x-2">
        {Icon !== undefined && <Icon size={16} />}
        {label}
        <IconChevronDown size={16} />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        placement="bottom"
        containerClassName="rounded-t-4xl flex flex-col gap-0 p-4 max-h-fit"
      >
        <Flex align="center" justify="center" className="w-full pb-6">
          <Box className="h-1 w-24 rounded-full bg-background-200" />
        </Flex>
        {items.map(({ label, onClick }) => (
          <Button
            key={label}
            onClick={() => {
              onClick()
              setOpen(false)
            }}
            variant="flat"
            className="w-full bg-transparent font-bold"
          >
            {label}
          </Button>
        ))}
        <Box className="py-4">
          <Button
            variant="outline"
            rounded="pill"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            閉じる
          </Button>
        </Box>
      </Drawer>
    </>
  )
}

const DropdownMenu: FC<MenuProps> = ({ items, label, icon: Icon }) => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button className="w-fit cursor-pointer items-center gap-x-2">
        {Icon !== undefined && <Icon size={16} />}
        {label}
        <IconChevronDown size={16} />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      {items.map(({ label, onClick }) => (
        <Dropdown.Item key={label} onClick={onClick}>
          {label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
)

export const Menu: FC<MenuProps> = (props) => {
  const isMobile = useMobile()

  return isMobile ? <DrawerMenu {...props} /> : <DropdownMenu {...props} />
}
