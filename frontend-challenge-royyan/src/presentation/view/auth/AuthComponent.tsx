import React from 'react';
import './auth-component.css';
import BaseView from '../BaseView';
import AuthViewModel from '../../view-model/auth/AuthViewModel';
import { Button, Input, Modal, Row, Space } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

export interface AuthComponentProps {
  authViewModel: AuthViewModel;
}

export interface AuthComponentState {
  emailQuery: string;
  passwordQuery: string;
  isSignInButtonVisible: boolean;
  isSignOutButtonVisible: boolean;

  isShowError: boolean;
  errorMessage: string;

  authStatus: string;
  isAuthStatusPositive: boolean;

  visible: boolean;
  onClose : (() => void) | null;
}

export default class AuthComponent extends React.Component<AuthComponentProps, AuthComponentState>
  implements BaseView {
  private authViewModel: AuthViewModel;

  public constructor(props: AuthComponentProps) {
    super(props);

    const { authViewModel } = this.props;
    this.authViewModel = authViewModel;

    this.state = {
      emailQuery: authViewModel.emailQuery,
      passwordQuery: authViewModel.passwordQuery,
      isSignInButtonVisible: authViewModel.isSignInButtonVisible,
      isSignOutButtonVisible: authViewModel.isSignOutButtonVisible,

      isShowError: authViewModel.isShowError,
      errorMessage: authViewModel.errorMessage,

      authStatus: authViewModel.authStatus,
      isAuthStatusPositive: authViewModel.isAuthStatusPositive,

      visible: authViewModel.visible,
      onClose: authViewModel.onClose,
    };
  }

  public componentDidMount(): void {
    this.authViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.authViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      emailQuery: this.authViewModel.emailQuery,
      passwordQuery: this.authViewModel.passwordQuery,
      isSignInButtonVisible: this.authViewModel.isSignInButtonVisible,
      isSignOutButtonVisible: this.authViewModel.isSignOutButtonVisible,

      isShowError: this.authViewModel.isShowError,
      errorMessage: this.authViewModel.errorMessage,

      authStatus: this.authViewModel.authStatus,
      isAuthStatusPositive: this.authViewModel.isAuthStatusPositive,

      visible: this.authViewModel.visible,
      onClose: this.authViewModel.onClose,
    });
  }

  public render(): JSX.Element {
    const {
      emailQuery,
      passwordQuery,
      isSignInButtonVisible,
      isSignOutButtonVisible,

      isShowError,
      errorMessage,

      authStatus,
      isAuthStatusPositive,

      visible,
    } = this.state;

    return (
      <>
        <Button type="ghost" onClick={this.authViewModel.onShowModal} role='btnshowlogin'>
          LOGIN
        </Button>
      
        <Modal
          title="Login"
          open={visible}
          // confirmLoading={confirmLoading}
          onCancel={this.authViewModel.onHandleCancel}
          footer = {[]}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: 'flex',
            }}>
            <div>
              Status:&nbsp;
              <Text type={`${isAuthStatusPositive ? 'success' : 'danger'}`} role='authstatus'>{authStatus}</Text>
            </div>

            <div className="row mt-2">
              <Input
                placeholder="user@email.com"
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  this.authViewModel.onEmailQueryChanged(e.currentTarget.value);
                }}
                value={emailQuery}
                role='authinputuname'
              />
            </div>
            <div className="row mt-2">
              <Input.Password
                placeholder="password"
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  this.authViewModel.onPasswordQueryChanged(e.currentTarget.value);
                }}
                value={passwordQuery}
                role='authinputpwd'
              />
            </div>

            {isShowError && (
              <Text type='danger' role='autherrormsg'>{errorMessage}</Text>
            )}

            {isSignInButtonVisible && (
              <Row justify="end">
                <Button 
                  type="primary" 
                  role='btnsignin'
                  onClick={(): void => this.authViewModel.onClickSignIn()}>
                    Sign in
                </Button>
              </Row>
            )}

            {isSignOutButtonVisible && (
              <Row justify="end">
                <Button 
                  type="default" 
                  role='btnsignout'
                  onClick={(): void => this.authViewModel.onClickSignOut()}
                >
                  Sign out
                </Button>
              </Row>
            )}
          </Space>
        </Modal>
      </>
    );
  }
}