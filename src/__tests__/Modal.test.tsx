import * as React from 'react';
import { mount } from 'enzyme';
import { Modal } from '../components';
import { showModal } from '../index';

describe('Modal Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render modal with title and content', () => {
    const wrapper = mount(
      <Modal
        title="Test Modal"
        content={<div>Test Content</div>}
        onClose={() => {}}
      />,
      { attachTo: container }
    );

    expect(wrapper.find('.modal-title').text()).toBe('Test Modal');
    expect(wrapper.find('.modal-content').text()).toBe('Test Content');
    wrapper.unmount();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal
        title="Test Modal"
        content={<div>Test Content</div>}
        onClose={onClose}
      />,
      { attachTo: container }
    );

    wrapper.find('.modal-close').simulate('click');
    expect(onClose).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should show modal using showModal function', async () => {
    const onShow = jest.fn();
    const onClose = jest.fn();

    const closeModal = await showModal({
      title: 'Dynamic Modal',
      content: <div>Dynamic Content</div>,
      onShow,
      onClose,
    });

    // Wait for React to finish rendering
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(onShow).toHaveBeenCalled();
    expect(document.querySelector('.modal-title')?.textContent).toBe('Dynamic Modal');
    expect(document.querySelector('.modal-content')?.textContent).toBe('Dynamic Content');

    // Close the modal
    closeModal();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(onClose).toHaveBeenCalled();
  });
});
