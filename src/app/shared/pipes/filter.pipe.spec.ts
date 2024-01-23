import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const FAKE_PROD=[
    {
      id:'1',
      name:'test',
      category:'Роли',
      subcategory:'string',
      description:'string',
      weight:'string',
      price:10,
      filePath:'string',
      count: 1
    },
    {
      id:'2',
      name:'test1',
      category:'Сети',
      subcategory:'string',
      description:'string',
      weight:'string',
      price:10,
      filePath:'string',
      count: 1
    }
  ] 

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Array filter pipe by category',()=>{
    let filter=new FilterPipe();

    expect(filter.transform(FAKE_PROD,'Роли')).toEqual([
      {
        id:'1',
        name:'test',
        category:'Роли',
        subcategory:'string',
        description:'string',
        weight:'string',
        price:10,
        filePath:'string',
        count: 1
      }
    ])
  });

  it('Null array filter pipe',()=>{
    let filter=new FilterPipe();
    
    expect(filter.transform([],'Роли')).toEqual([])
  });

  it('Array filter pipe by category and subcategory="All"',()=>{
    let filter=new FilterPipe();

    expect(filter.transform(FAKE_PROD,'Роли','All')).toEqual([
      {
        id:'1',
        name:'test',
        category:'Роли',
        subcategory:'string',
        description:'string',
        weight:'string',
        price:10,
        filePath:'string',
        count: 1
      }
    ])
  });

  it('Array filter pipe by empty category',()=>{
    let filter=new FilterPipe();

    expect(filter.transform(FAKE_PROD,'')).toEqual([])
  });

  it('Array filter pipe by category and subcategory',()=>{
    let filter=new FilterPipe();

    expect(filter.transform(FAKE_PROD,'Сети','string')).toEqual([
      {
        id:'2',
        name:'test1',
        category:'Сети',
        subcategory:'string',
        description:'string',
        weight:'string',
        price:10,
        filePath:'string',
        count: 1
      }
    ])
  });

});
