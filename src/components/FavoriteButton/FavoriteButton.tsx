import HeartFill from "../../assets/icons/icHeart.svg";
import HeartEmpty from "../../assets/icons/icEmptyHeart.svg";
import { FavButton, IconBox } from "./styles";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  labelOn?: string;
  labelOff?: string;
  title?: string;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  iconSize?: number | string;
  size?: number | string;
}

const FavoriteButton = ({
  active,
  onToggle,
  labelOn = "Quitar de favoritos",
  labelOff = "Añadir a favoritos",
  title = "Favorite",
  iconOn,
  iconOff,
  disabled,
  className,
  iconSize,
  size,
}: FavoriteButtonProps) => {
  const ariaLabel = active ? labelOn : labelOff;
  const resolvedSize = iconSize ?? size ?? "1.5rem";

  const content = active
    ? (iconOn ?? <img src={HeartFill} alt="Quitar de favoritos" />)
    : (iconOff ?? <img src={HeartEmpty} alt="Añadir a favoritos" />);

  return (
    <FavButton
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
      className={className}
      data-active={active ? "true" : "false"}
    >
      <IconBox $size={resolvedSize}>{content}</IconBox>
    </FavButton>
  );
};

export default FavoriteButton;
