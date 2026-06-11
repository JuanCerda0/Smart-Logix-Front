export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export interface TopbarProps {
  logo?: string
  links: NavLink[]
  sticky?: boolean
  theme?: 'light' | 'dark'
}