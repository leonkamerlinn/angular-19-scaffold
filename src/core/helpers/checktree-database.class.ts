import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';

export class ItemNode {
  id: number | string;
  checked: boolean;
  children: ItemNode[];
  name: string;

  constructor(name: string) {
    this.id = 0;
    this.checked = false;
    this.children = [];
    this.name = name;
  }

  setId(id: number | string): ItemNode {
    this.id = id;

    return this;
  }

  setChildren(children: ItemNode[]): ItemNode {
    this.children = children;

    return this;
  }

  setName(name: string): ItemNode {
    this.name = name;

    return this;
  }

  setChecked(checked: boolean): ItemNode {
    this.checked = checked;

    return this;
  }
}

export class ItemFlatNode {
  id: number | string;
  name: string;
  level: number;
  checked: boolean;
  expandable: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.level = 0;
    this.checked = false;
    this.expandable = false;
  }
}

export abstract class CheckTreeDatabase {
  readonly dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;
  readonly checklistSelection: SelectionModel<ItemFlatNode>;
  readonly treeControl: FlatTreeControl<ItemFlatNode>;
  private readonly _treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
  private readonly _nestedNodeMap = new Map<ItemNode, ItemFlatNode>();
  private readonly _flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  protected constructor() {
    this._treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this._treeFlattener);
    this.checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);
  }

  set data(nodes: ItemNode[]) {
    this.dataSource.data = nodes;
    this.checkAll();
  }

  hasChildren = (_: number, _nodeData: ItemFlatNode): boolean => _nodeData.expandable;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);

    return (
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      })
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const isSelected = descendants.some((child) => this.checklistSelection.isSelected(child));

    return isSelected && !this.descendantsAllSelected(node);
  }

  checkAll(): void {
    for (const node of this.treeControl.dataNodes) {
      if (node.checked) {
        if (node.expandable) {
          this.itemSelectionToggle(node);
        } else {
          this.leafItemSelectionToggle(node);
        }
      }
    }
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  itemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  leafItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ItemFlatNode): void {
    let parent: ItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ItemFlatNode): void {
    const isNodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const isDescAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (isNodeSelected && !isDescAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!isNodeSelected && isDescAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: ItemFlatNode): ItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }

    return null;
  }

  private getLevel = (node: ItemFlatNode): number => node.level;

  private isExpandable = (node: ItemFlatNode): boolean => node.expandable;

  private getChildren = (node: ItemNode): ItemNode[] => node.children;

  private transformer = (node: ItemNode, level: number): ItemFlatNode => {
    const existingNode = this._nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new ItemFlatNode();
    flatNode.name = node.name;
    flatNode.id = node.id;
    flatNode.checked = node.checked;
    flatNode.level = level;
    flatNode.expandable = node && node.children && node.children.length > 0;
    this._flatNodeMap.set(flatNode, node);
    this._nestedNodeMap.set(node, flatNode);

    return flatNode;
  };
}
