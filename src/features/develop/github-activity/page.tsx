import { IconLink, IconUserPlus, IconX } from '@tabler/icons-react'
import { type FC, type KeyboardEvent, useCallback, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { Avatar } from 'rizzui/avatar'
import { Badge } from 'rizzui/badge'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { useTheme } from '../../../hooks/useTheme'

type GithubActivityProps = {
  initialUsers: string[]
}

export const GithubActivity: FC<GithubActivityProps> = ({ initialUsers }) => {
  const { theme } = useTheme()
  const [inputUsername, onChangeInputUsername, setInputUsername] = useInputState('')
  const [users, setUsers] = useState(initialUsers)

  const handleAddUser = useCallback(() => {
    setUsers((prev) => [...prev, inputUsername.trim()])
    setInputUsername('')
  }, [inputUsername, setInputUsername])

  const handleKeydown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddUser()
      }
    },
    [handleAddUser],
  )

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'github-activity',
        ]}
      />
      <Title className="text-xl">GitHubアクティビティ</Title>
      <Flex direction="col" gap="4">
        <Flex align="center" gap="4">
          <Input
            value={inputUsername}
            onChange={onChangeInputUsername}
            onKeyDown={handleKeydown}
            placeholder="GitHubのユーザー名を入力"
            className="w-full"
          />
          <Button
            className="w-fit cursor-pointer p-2 disabled:cursor-not-allowed"
            onClick={handleAddUser}
            disabled={inputUsername.trim() === ''}
          >
            <IconUserPlus size={20} />
          </Button>
        </Flex>
        <Flex className="flex-wrap" gap="2">
          {users.map((user) => (
            <Badge key={user} variant="outline" className="gap-x-2 border-primary-lighter">
              <Avatar src={`https://github.com/${user}.png`} name={user} className="!w-4 !h-4" />
              {user}
              <Button
                variant="flat"
                className="h-fit cursor-pointer bg-transparent p-1 hover:bg-muted"
                rounded="pill"
                onClick={() => setUsers((prev) => prev.filter((u) => u !== user))}
              >
                <IconX size={10} />
              </Button>
            </Badge>
          ))}
        </Flex>
      </Flex>
      <Flex direction="col" gap="8" className="scrollbar-thin relative w-full overflow-x-scroll">
        {users.map((user) => (
          <Flex key={user} direction="col" gap="4">
            <Flex align="center" className="sticky left-0 w-fit">
              <Avatar src={`https://github.com/${user}.png`} name={user} size="sm" />
              <Title as="h3" className="text-base">
                <a
                  href={`https://github.com/${user}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  @{user}
                </a>
              </Title>
            </Flex>
            <div className="w-fit [&>article>footer>div:first-child]:left-0 [&>article>footer>div:last-child]:right-0 [&>article>footer>div]:sticky [&>article>footer]:flex">
              <GitHubCalendar username={user} colorScheme={theme} />
            </div>
          </Flex>
        ))}
      </Flex>
      {users.length > 0 && (
        <Flex align="center" gap="4">
          <Button
            className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
            onClick={() => copyLocation('/develop/github-activity', { users })}
            disabled={users.length === 0}
          >
            <IconLink size={16} />
            URLをコピー
          </Button>
        </Flex>
      )}
    </>
  )
}
