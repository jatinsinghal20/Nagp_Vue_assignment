import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import ArticlesComment from '@/components/ArticlesComment.vue';
import Comment from '@/Common/Models/Comment';
const localVue = createLocalVue();

localVue.use(Vuex)


describe('ArticlesComment.vue', () => {

  let actions: any
  let store
  let comment :Comment

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    comment = {
      author: {username:'jatin',following: false},
      body:'body',
      createdAt:'',
      updatedAt:'',
      id:0
    };
  })

  it('renders props.Article when passed', () => {    
    const wrapper = shallowMount(ArticlesComment, {
      propsData: { comment }, localVue
    });
    expect(wrapper.text()).toMatch(comment.body);
  });
});