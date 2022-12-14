import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect } from 'react';

import SubmitButton from '@components/Button/SubmitButton';
import { InputWithLabel } from '@components/Input/InputWithLabel';
import useInputValidation from '@hooks/useInputValidation';
import useSignUp from '@hooks/useSignUp';
import validate from '@utils/validate';

const form = css`
  padding: 42px;

  h1 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const linkWrapper = css`
  display: flex;
  justify-content: space-between;
  margin: 24px 12px;

  a {
    color: #4c6ef5;
  }
`;

const SignUpContainer = () => {
  const router = useRouter();
  const { isSubmitting, isSuccess, resultMsg, requestSignUp } = useSignUp();
  const { values, results, isAllPass, eventHandler } = useInputValidation({
    names: ['name', 'id', 'email', 'password', 'checkPassword'],
    validate,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, id, email, password, checkPassword } = values;
    requestSignUp({
      name,
      id,
      email,
      password,
      secondPassword: checkPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => router.push('/login'), 3000);
    }
  }, [isSuccess]);

  return (
    <form css={form} onSubmit={handleSubmit}>
      <h1>FIRE-Planner ð¥</h1>
      <InputWithLabel
        label="ì´ë¦"
        name="name"
        type="text"
        placeholder="ì´ë¦ì ìë ¥í´ì£¼ì¸ì."
        onBlur={eventHandler}
        helperText={results.name.isError && results.name.errorMsg}
      />
      <InputWithLabel
        label="ìì´ë"
        name="id"
        type="text"
        placeholder="IDë¥¼ ìë ¥í´ì£¼ì¸ì."
        onBlur={eventHandler}
        helperText={results.id.isError && results.id.errorMsg}
      />
      <InputWithLabel
        label="ì´ë©ì¼"
        name="email"
        type="email"
        placeholder="ì´ë©ì¼ì ìë ¥í´ì£¼ì¸ì."
        onBlur={eventHandler}
        helperText={results.email.isError && results.email.errorMsg}
      />
      <InputWithLabel
        label="ë¹ë°ë²í¸"
        name="password"
        type="password"
        placeholder="ë¹ë°ë²í¸ë¥¼ ìë ¥í´ì£¼ì¸ì."
        onBlur={eventHandler}
        helperText={results.password.isError && results.password.errorMsg}
      />
      <InputWithLabel
        label="ë¹ë°ë²í¸ íì¸"
        name="checkPassword"
        type="password"
        placeholder="ë¹ë°ë²í¸ë¥¼ ë¤ì ìë ¥í´ì£¼ì¸ì."
        onBlur={e => eventHandler(e, values.password)}
        helperText={
          results.checkPassword.isError && results.checkPassword.errorMsg
        }
      />
      <div>{resultMsg}</div>
      <SubmitButton name="íìê°ì" disabled={!isAllPass || isSubmitting} />
      <div css={linkWrapper}>
        <div>ì´ë¯¸ íìì´ì ê°ì?</div>
        <Link href="/signin">ë¡ê·¸ì¸ &rarr;</Link>
      </div>
    </form>
  );
};

export default SignUpContainer;
