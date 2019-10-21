import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import ArticlePreview from '@/components/ArticlePreview.vue';
import Article from '@/Common/Models/Article';
const localVue = createLocalVue();

localVue.use(Vuex)


describe('ArticlePreview.vue', () => {

  let actions: any
  let store
  let article :Article

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    article = {
      title : "new",
      description: "DEscription",
      author: {username:'jatin',following: false},
      body:'body',
      createdAt:'',
      favorited:true,
      favoritesCount:0,
      slug:'',
      updatedAt:''
    };
  })

  it('renders props.Article when passed', () => {    
    const wrapper = shallowMount(ArticlePreview, {
      propsData: { article }, localVue
    });
    expect(wrapper.text()).toMatch(article.title);
  });
});