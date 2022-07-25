import React, { FC } from "react";
import { Badge } from "@chakra-ui/react";
import { checkIfRecent } from "src/utils/time";

export const checkBadges = (planted: string, tended: string, status: string) => {
  const today = new Date();
  const plantedDate = new Date(planted);
  const tendedDate = new Date(tended);

  const newBadge = checkIfRecent(plantedDate, today);
  // no need for updated badge if new badge since it's implicit it was updated
  const updatedBadge = !newBadge && checkIfRecent(tendedDate, today);

  return { newBadge, updatedBadge, statusBadge: status !== `published` };
};

export interface IBadgesProps {
  newBadge?: boolean;
  updatedBadge?: boolean;
  statusBadge?: boolean;
  status?: string;
}
export const Badges: FC<IBadgesProps> = ({
  newBadge = false,
  updatedBadge = false,
  statusBadge = false,
  status = ``,
}) => (
  <>
    {newBadge && (
      <Badge borderRadius="full" px="2" colorScheme="green" color="green.500">
        New
      </Badge>
    )}
    {updatedBadge && (
      <Badge borderRadius="full" px="2" colorScheme="orange" color="orange.500">
        Updated
      </Badge>
    )}
    {statusBadge && (
      <Badge borderRadius="full" px="2" colorScheme="red" color="red.500">
        {status}
      </Badge>
    )}
  </>
);
export default Badges;
