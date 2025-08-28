import marvelNotFound from "../../assets/img/imgNotFound.png";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../routes/routes";
import {
  Actions,
  Content,
  Description,
  Illustration,
  Title,
  Wrapper,
} from "./styles";

interface NotFound404Props {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  testId?: string;
}

const NotFound404 = ({
  imageUrl = marvelNotFound,
  title = "404 PAGE NOT FOUND",
  description = "Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.",
  buttonText = "GO HOME",
  className,
  testId,
}: NotFound404Props) => {
  const navigate = useNavigate();
  return (
    <Wrapper data-testid={testId} className={className}>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Actions>
          <Button onClick={() => navigate(PUBLIC_ROUTES.HOME)}>
            {buttonText}
          </Button>
        </Actions>
      </Content>
      <div>
        <Illustration
          data-testid="illustration"
          aria-hidden="true"
          $src={imageUrl}
        />
      </div>
    </Wrapper>
  );
};

export default NotFound404;
