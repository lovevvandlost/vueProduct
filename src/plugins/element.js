/*
 * @Description: element-ui 插件
 * @Author:  
 * @Date: 2021-10-30 17:28:00
 * @LastEditTime: 2021-11-04 18:54:38
 * @LastEditors:  
 */
import {
    Alert,
    Aside, Breadcrumb, BreadcrumbItem, Button, Card, Cascader, Checkbox, CheckboxGroup, Col, Container, Dialog, Form,
    FormItem, Header, Input, Main, Menu, MenuItem, MenuItemGroup, Message, MessageBox, Option, Pagination, Row, Select, Step, Steps, Submenu, Switch, Table, TableColumn, TabPane, Tabs, Tag, Tooltip, Tree
} from 'element-ui';
import Vue from "vue";


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Cascader)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm