interface CategoryProps {
  id: string;
  name: string;
  description: string;
}

export class Category {
  props!: CategoryProps;

  constructor(props: CategoryProps) {
    Object.assign(this, props);
  }
}
