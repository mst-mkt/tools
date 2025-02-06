import { IconChevronRight } from '@tabler/icons-react'
import { Link, type ToOptions } from '@tanstack/react-router'
import { type FC, Fragment } from 'react'
import { Flex } from 'rizzui/flex'
import { Grid } from 'rizzui/grid'

type BreadcrumbProps = {
  items: (string | { label: string; toOptions: ToOptions })[]
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => (
  <Grid
    as="ol"
    gap="4"
    align="center"
    className="w-fit grid-flow-col overflow-hidden text-muted-foreground text-sm"
  >
    {items.map((item, index) => (
      <Fragment key={typeof item === 'string' ? item : item.label}>
        {index !== 0 && (
          <Flex as="li" className="w-fit">
            <IconChevronRight size={12} />
          </Flex>
        )}
        <Flex as="li" className="block w-full truncate">
          {typeof item === 'string' ? (
            item
          ) : (
            <Link className="hover:underline" {...item.toOptions}>
              {item.label}
            </Link>
          )}
        </Flex>
      </Fragment>
    ))}
  </Grid>
)
