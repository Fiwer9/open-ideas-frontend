import React from "react";

import modalStyles from "../../ratingComponents/styles/RatingUserExpandedModal.module.scss";
import sk from "../shared/skeleton.module.scss";

interface InitiativeCardsPlaceholderProps {
  count?: number;
}

const InitiativeCardsPlaceholder: React.FC<InitiativeCardsPlaceholderProps> = ({
  count = 3,
}) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={`${modalStyles.initiativeCard} ${modalStyles.initiativeCardPlaceholder} ${sk.block} ${sk.pulse}`}
        aria-hidden
      />
    ))}
  </>
);

export default InitiativeCardsPlaceholder;
