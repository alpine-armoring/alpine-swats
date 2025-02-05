import Link from 'next/link';
import Image from 'next/image';
import styles from './ListingItem.module.scss';

interface InventoryItemProps {
  props: any;
  index: number;
}

const InventoryItem = ({ props, index }: InventoryItemProps) => {
  const data = props.attributes;

  return (
    <Link
      href={`/armored-rentals/${data.slug}`}
      className={`
        ${styles.inventory_item}
      `}
    >
      <div className={`${styles.inventory_item_image}`}>
        {data?.rentalsFeaturedImage?.data ? (
          <Image
            src={`${
              data.rentalsFeaturedImage.data.attributes.formats.medium.url ||
              data.rentalsFeaturedImage.data.attributes.url
            }`}
            alt={
              data.rentalsFeaturedImage.data.attributes.alternativeText ||
              'Alpine Armoring'
            }
            width={563}
            height={433}
            priority={index === 0}
            sizes="(max-width: 1600px) 50vw, 30vw"
          />
        ) : null}

        <div className={`${styles.inventory_item_button}`}>
          <span>VIEW DETAILS</span>
        </div>
      </div>

      <div className={`${styles.inventory_item_content}`}>
        <h2
          className={`${styles.inventory_item_title}`}
          dangerouslySetInnerHTML={{
            __html: `${data.title.replaceAll(/luxury/gi, '')}`,
          }}
        ></h2>

        <h3 className={`${styles.inventory_item_level}`}>
          Armored to <span>level {data.armor_level}</span>
        </h3>

        <ul className={`${styles.inventory_item_info}`}>
          {data.rentalsVehicleID ? (
            <li className={`${styles.inventory_item_info_item}`}>
              <strong>Vehicle ID:</strong>
              <span>{data.rentalsVehicleID}</span>
            </li>
          ) : null}
          {data.engine ? (
            <li className={`${styles.inventory_item_info_item}`}>
              <strong>Engine:</strong>
              <span>{data.engine}</span>
            </li>
          ) : null}
          {data.trans ? (
            <li className={`${styles.inventory_item_info_item}`}>
              <strong>Trans:</strong>
              <span>{data.trans}</span>
            </li>
          ) : null}
        </ul>
      </div>
    </Link>
  );
};

export default InventoryItem;
