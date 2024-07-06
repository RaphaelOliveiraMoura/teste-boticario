interface CategoryProps {
  id: string;
  name: string;
  description: string;
}

export class Category {
  constructor(public props: CategoryProps) {}
}
